/*
  Warnings:

  - A unique constraint covering the columns `[publicShareId]` on the table `AssessmentResult` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AssessmentResult" ADD COLUMN     "isPublic" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publicShareId" TEXT,
ADD COLUMN     "sharedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentResult_publicShareId_key" ON "AssessmentResult"("publicShareId");
