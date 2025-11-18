import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user's invites
    const invites = await prisma.inviteLink.findMany({
      where: {
        inviterId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate remaining invites (simplified - you can integrate TierService here)
    const totalInvites = invites.length;
    const tier = "free"; // TODO: Get from user profile
    const maxInvites = tier === "free" ? 3 : 999;
    const remaining = Math.max(0, maxInvites - totalInvites);

    return NextResponse.json({
      invites,
      remaining_invites: remaining,
    });
  } catch (error) {
    console.error("Error fetching invites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
