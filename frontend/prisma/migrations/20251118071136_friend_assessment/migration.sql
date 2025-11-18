/*
  Warnings:

  - You are about to drop the column `code` on the `InviteLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inviteCode]` on the table `InviteLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inviteCode` to the `InviteLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InviteLink` table without a default value. This is not possible if the table is not empty.
  - Made the column `expiresAt` on table `InviteLink` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InviteLink" DROP CONSTRAINT "InviteLink_targetId_fkey";

-- DropIndex
DROP INDEX "InviteLink_code_key";

-- AlterTable
ALTER TABLE "InviteLink" DROP COLUMN "code",
ADD COLUMN     "abandonedAt" TIMESTAMP(3),
ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "deviceType" TEXT,
ADD COLUMN     "friendEmail" TEXT,
ADD COLUMN     "friendNickname" TEXT,
ADD COLUMN     "inviteCode" TEXT NOT NULL,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "openedAt" TIMESTAMP(3),
ADD COLUMN     "relationshipType" TEXT,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ALTER COLUMN "targetId" DROP NOT NULL,
ALTER COLUMN "expiresAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Response" ADD COLUMN     "flaggedMalicious" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "notSure" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "qualityScore" DOUBLE PRECISION,
ADD COLUMN     "responseTime" INTEGER;

-- CreateTable
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "invitesSent" INTEGER NOT NULL DEFAULT 0,
    "windowStart" TIMESTAMP(3) NOT NULL,
    "windowEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "RateLimit_userId_windowEnd_idx" ON "RateLimit"("userId", "windowEnd");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimit_userId_windowStart_key" ON "RateLimit"("userId", "windowStart");

-- CreateIndex
CREATE UNIQUE INDEX "InviteLink_inviteCode_key" ON "InviteLink"("inviteCode");

-- CreateIndex
CREATE INDEX "InviteLink_inviterId_status_idx" ON "InviteLink"("inviterId", "status");

-- CreateIndex
CREATE INDEX "InviteLink_expiresAt_idx" ON "InviteLink"("expiresAt");

-- CreateIndex
CREATE INDEX "InviteLink_ipAddress_createdAt_idx" ON "InviteLink"("ipAddress", "createdAt");

-- AddForeignKey
ALTER TABLE "InviteLink" ADD CONSTRAINT "InviteLink_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
