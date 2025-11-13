// src/app/api/update-profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/db/prisma';

/**
 * Update User and Profile after assessment completion
 * 
 * This endpoint is called from the results page to:
 * 1. Update User.name with demographics name (if not set from Clerk)
 * 2. Create or update Profile with personality results and bio
 */
export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const body = await req.json();
    const { demographics, scores, narrative } = body;

    if (!demographics || !scores || !narrative) {
      return NextResponse.json(
        { error: 'Missing required fields: demographics, scores, narrative' },
        { status: 400 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUserId },
      include: { profile: true },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate age from date of birth if provided
    let age: number | null = null;
    if (demographics.demo_dob) {
      const birthDate = new Date(demographics.demo_dob);
      const today = new Date();
      age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
    }

    // Update User.name if it's empty or just "null null" from Clerk
    const demographicName = demographics.demo_name;
    const shouldUpdateName = !user.name || user.name === 'null null' || user.name.trim() === '';
    
    if (demographicName && shouldUpdateName) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: demographicName },
      });
    }

    // Build bio from demographics
    const bioParts: string[] = [];
    if (age) bioParts.push(`${age} years old`);
    if (demographics.demo_gender && demographics.demo_gender !== 'prefer_not_to_say') {
      bioParts.push(demographics.demo_gender);
    }
    if (demographics.demo_country) {
      bioParts.push(`from ${demographics.demo_country}`);
    }
    const bio = bioParts.length > 0 ? bioParts.join(', ') : null;

    // Prepare personality data
    const personalityData = {
      scores,
      narrative,
      completedAt: new Date().toISOString(),
      demographics: {
        age,
        gender: demographics.demo_gender,
        country: demographics.demo_country,
      },
    };

    // Create or update Profile
    const profile = await prisma.profile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        bio,
        personality: personalityData,
      },
      update: {
        bio,
        personality: personalityData,
      },
    });

    console.log(`✅ Updated profile for user ${clerkUserId}`);

    return NextResponse.json({
      success: true,
      profile: {
        id: profile.id,
        bio: profile.bio,
        hasPersonality: true,
      },
    });
  } catch (error) {
    console.error('❌ Error updating profile:', error);
    return NextResponse.json(
      { error: 'Failed to update profile', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
