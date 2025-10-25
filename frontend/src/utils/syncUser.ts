// src/utils/syncUser.ts
import { prisma } from "@/db/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUserToDB() {
  const user = await currentUser();
  if (!user) {
    console.error("No authenticated user found");
    return null;
  }

  // Check if the user already exists in the database using their Clerk ID
  const existing = await prisma.user.findUnique({
    where: { clerkId: user.id },
  });

  if (existing) {
    return existing;
  }

  // Ensure the user has an email address
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    console.error("No email address found for user:", user.id);
    return null;
  }

  // Create a full name by combining first and last names
  const fullName = `${user.firstName} ${user.lastName}`;

  // Create the user in the database
  try {
    return await prisma.user.create({
      data: {
        clerkId: user.id,
        email: email,
        name: fullName,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}
