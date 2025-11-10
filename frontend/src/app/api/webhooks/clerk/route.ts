import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/db/prisma'

export async function POST(req: Request) {
  // Get the webhook secret from environment
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.error('❌ CLERK_WEBHOOK_SECRET is not set')
    console.error('⚠️  Current environment:', process.env.NODE_ENV)
    console.error('💡 Follow setup guide: AUTHENTICATION_SETUP.md')
    return new Response('Webhook secret not configured', { status: 500 })
  }

  console.log('🔐 Webhook handler called - Environment:', process.env.NODE_ENV || 'development')
  
  // Get the headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('❌ Missing svix headers')
    return new Response('Missing svix headers', { status: 400 })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the webhook signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('❌ Webhook signature verification failed:', err)
    return new Response('Invalid signature', { status: 400 })
  }

  // Handle the webhook event
  const eventType = evt.type
  console.log(`📨 Webhook received: ${eventType}`)

  try {
    switch (eventType) {
      case 'user.created': {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data

        // Get primary email
        const primaryEmail = email_addresses.find(
          (email) => email.id === evt.data.primary_email_address_id
        )

        if (!primaryEmail) {
          console.error('❌ No primary email found for user')
          return new Response('No primary email', { status: 400 })
        }

        // Use upsert to make this idempotent (handle duplicate webhooks gracefully)
        await prisma.user.upsert({
          where: { clerkId: id },
          create: {
            clerkId: id,
            email: primaryEmail.email_address,
            name: [first_name, last_name].filter(Boolean).join(' ') || null,
            profile: {
              create: {
                avatarUrl: image_url || null,
              },
            },
          },
          update: {
            email: primaryEmail.email_address,
            name: [first_name, last_name].filter(Boolean).join(' ') || null,
          },
        })

        console.log(`✅ User created: ${id} (${primaryEmail.email_address})`)
        break
      }

      case 'user.updated': {
        const { id, email_addresses, first_name, last_name, image_url } = evt.data

        // Get primary email
        const primaryEmail = email_addresses.find(
          (email) => email.id === evt.data.primary_email_address_id
        )

        if (!primaryEmail) {
          console.error('❌ No primary email found for user')
          return new Response('No primary email', { status: 400 })
        }

        // Update user and profile
        await prisma.user.update({
          where: { clerkId: id },
          data: {
            email: primaryEmail.email_address,
            name: [first_name, last_name].filter(Boolean).join(' ') || null,
            profile: {
              upsert: {
                create: {
                  avatarUrl: image_url || null,
                },
                update: {
                  avatarUrl: image_url || null,
                },
              },
            },
          },
        })

        console.log(`✅ User updated: ${id}`)
        break
      }

      case 'user.deleted': {
        const { id } = evt.data

        if (!id) {
          console.error('❌ No user ID in delete event')
          return new Response('No user ID', { status: 400 })
        }

        // Delete user (cascade will handle profile, sessions, etc.)
        await prisma.user.delete({
          where: { clerkId: id },
        })

        console.log(`✅ User deleted: ${id}`)
        break
      }

      default:
        console.log(`ℹ️ Unhandled webhook event: ${eventType}`)
    }

    return new Response('Webhook processed', { status: 200 })
  } catch (error) {
    console.error(`❌ Error processing webhook ${eventType}:`, error)
    
    // Return 200 to prevent Svix from retrying if it's a data error
    // Return 500 for infrastructure errors to trigger retry
    
    // Handle Prisma unique constraint violations (P2002)
    // This happens when webhook is delivered twice or user already exists
    if (
      error && 
      typeof error === 'object' && 
      'code' in error && 
      error.code === 'P2002'
    ) {
      console.log('ℹ️  User already exists in database (duplicate webhook delivery)')
      return new Response('Already processed', { status: 200 })
    }
    
    // Also handle generic unique constraint errors
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      console.log('ℹ️  Duplicate user - webhook already processed')
      return new Response('Already processed', { status: 200 })
    }
    
    return new Response('Internal error', { status: 500 })
  }
}
