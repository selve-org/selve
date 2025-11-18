import { headers } from 'next/headers'

export async function POST(req: Request) {
  // Get all headers
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing svix headers', { status: 400 })
  }

  // Get body
  const body = await req.json()

  // Forward to backend
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

  try {
    const response = await fetch(`${backendUrl}/api/webhooks/clerk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      },
      body: JSON.stringify(body),
    })

    const responseText = await response.text()
    return new Response(responseText, { status: response.status })
  } catch (error) {
    console.error('Error forwarding webhook to backend:', error)
    return new Response('Failed to forward webhook', { status: 500 })
  }
}
