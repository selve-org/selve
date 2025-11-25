-- CreateTable
CREATE TABLE "FriendInsightGeneration" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "selfScores" JSONB NOT NULL,
    "friendScores" JSONB NOT NULL,
    "blindSpots" JSONB NOT NULL,
    "friendCount" INTEGER NOT NULL,
    "friendResponseIds" TEXT[],
    "inputHash" TEXT NOT NULL,
    "selfScoresFrozenAt" TIMESTAMP(3) NOT NULL,
    "friendScoresFrozenAt" TIMESTAMP(3) NOT NULL,
    "narrative" TEXT,
    "generationModel" TEXT,
    "promptTokens" INTEGER,
    "completionTokens" INTEGER,
    "generationCost" DOUBLE PRECISION,
    "generationError" TEXT,
    "regeneratedBecause" TEXT,
    "tone" TEXT NOT NULL DEFAULT 'friendly',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "FriendInsightGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FriendInsightGeneration_sessionId_idx" ON "FriendInsightGeneration"("sessionId");

-- CreateIndex
CREATE INDEX "FriendInsightGeneration_inputHash_idx" ON "FriendInsightGeneration"("inputHash");

-- AddForeignKey
ALTER TABLE "FriendInsightGeneration" ADD CONSTRAINT "FriendInsightGeneration_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
