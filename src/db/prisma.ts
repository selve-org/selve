import { PrismaClient } from "@/generated/prisma";

// TypeScript definition for the global object
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Instantiate Prisma Client as a singleton
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, store the Prisma instance in the global object
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
