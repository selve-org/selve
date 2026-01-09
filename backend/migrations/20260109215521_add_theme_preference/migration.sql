/*
  Warnings:

  - Added the required column `clerkUserId` to the `ChatbotAnalytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ChatbotAnalytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatbotAnalytics" ADD COLUMN     "clerkUserId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "periodEnd" TIMESTAMP(3),
ADD COLUMN     "periodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "resetAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "clerkCustomerId" TEXT,
ADD COLUMN     "currentPeriodCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "currentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "currentPeriodStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "lastUsageReset" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "planEndDate" TIMESTAMP(3),
ADD COLUMN     "planStartDate" TIMESTAMP(3),
ADD COLUMN     "subscriptionId" TEXT,
ADD COLUMN     "subscriptionPlan" TEXT NOT NULL DEFAULT 'free',
ADD COLUMN     "subscriptionStatus" TEXT,
ADD COLUMN     "themePreference" TEXT;

-- CreateIndex
CREATE INDEX "ChatbotAnalytics_clerkUserId_periodStart_idx" ON "ChatbotAnalytics"("clerkUserId", "periodStart");

-- CreateIndex
CREATE INDEX "ChatbotAnalytics_clerkUserId_resetAt_idx" ON "ChatbotAnalytics"("clerkUserId", "resetAt");
