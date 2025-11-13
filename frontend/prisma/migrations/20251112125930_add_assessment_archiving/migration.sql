-- AlterTable
ALTER TABLE "AssessmentResult" ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "AssessmentSession" ADD COLUMN     "archivedAt" TIMESTAMP(3),
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE INDEX "AssessmentResult_clerkUserId_isCurrent_idx" ON "AssessmentResult"("clerkUserId", "isCurrent");

-- CreateIndex
CREATE INDEX "AssessmentSession_clerkUserId_isCurrent_idx" ON "AssessmentSession"("clerkUserId", "isCurrent");

-- CreateIndex
CREATE INDEX "AssessmentSession_clerkUserId_completedAt_idx" ON "AssessmentSession"("clerkUserId", "completedAt");
