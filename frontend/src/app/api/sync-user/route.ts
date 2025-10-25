// src/app/api/sync-user/route.ts

// Server-side code
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";
import { prisma } from "@/db/prisma";

export async function POST() {
  const { userId } = await auth(); // Secure Clerk auth token
  if (!userId) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  try {
    const existing = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (existing) return NextResponse.json({ success: true });

    const clerkUser = await clerkClient.users.getUser(userId);
    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

    const user = await prisma.user.create({
      data: {
        clerkId: userId,
        email,
        name,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Error syncing user:", error);
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
