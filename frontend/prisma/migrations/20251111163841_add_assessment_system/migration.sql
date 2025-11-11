-- DropForeignKey
ALTER TABLE "QuestionnaireAnswer" DROP CONSTRAINT "QuestionnaireAnswer_questionId_fkey";

-- CreateTable
CREATE TABLE "AssessmentSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clerkUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'in-progress',
    "responses" JSONB NOT NULL,
    "demographics" JSONB,
    "pendingQuestions" JSONB,
    "answerHistory" JSONB,
    "backNavigationCount" INTEGER NOT NULL DEFAULT 0,
    "backNavigationLog" JSONB,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),

    CONSTRAINT "AssessmentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "clerkUserId" TEXT,
    "scoreLumen" DOUBLE PRECISION NOT NULL,
    "scoreAether" DOUBLE PRECISION NOT NULL,
    "scoreOrpheus" DOUBLE PRECISION NOT NULL,
    "scoreOrin" DOUBLE PRECISION NOT NULL,
    "scoreLyra" DOUBLE PRECISION NOT NULL,
    "scoreVara" DOUBLE PRECISION NOT NULL,
    "scoreChronos" DOUBLE PRECISION NOT NULL,
    "scoreKael" DOUBLE PRECISION NOT NULL,
    "narrative" JSONB NOT NULL,
    "archetype" TEXT,
    "profilePattern" TEXT,
    "consistencyScore" DOUBLE PRECISION,
    "attentionScore" DOUBLE PRECISION,
    "validationFlags" JSONB,
    "generationCost" DOUBLE PRECISION,
    "generationModel" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentTemplate" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "version" TEXT NOT NULL DEFAULT '1.0',
    "items" JSONB NOT NULL,
    "dimensions" JSONB NOT NULL,
    "minItemsPerDimension" INTEGER NOT NULL DEFAULT 2,
    "maxTotalItems" INTEGER NOT NULL DEFAULT 54,
    "uncertaintyThreshold" DOUBLE PRECISION NOT NULL DEFAULT 0.3,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AssessmentTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentResult_sessionId_key" ON "AssessmentResult"("sessionId");

-- CreateIndex
CREATE INDEX "AssessmentResult_userId_idx" ON "AssessmentResult"("userId");

-- CreateIndex
CREATE INDEX "AssessmentResult_clerkUserId_idx" ON "AssessmentResult"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentTemplate_name_key" ON "AssessmentTemplate"("name");

-- CreateIndex
CREATE INDEX "AssessmentTemplate_isActive_idx" ON "AssessmentTemplate"("isActive");

-- AddForeignKey
ALTER TABLE "AssessmentResult" ADD CONSTRAINT "AssessmentResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
