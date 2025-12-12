-- CreateTable
CREATE TABLE "UserNote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'observation',
    "content" VARCHAR(500) NOT NULL,
    "importance" INTEGER NOT NULL DEFAULT 3,
    "source" TEXT NOT NULL DEFAULT 'chatbot',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserNote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SecurityIncident" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clerkUserId" TEXT,
    "sessionId" TEXT,
    "incidentType" TEXT NOT NULL,
    "riskScore" DOUBLE PRECISION NOT NULL,
    "detectionTier" INTEGER NOT NULL DEFAULT 1,
    "flags" JSONB NOT NULL DEFAULT '[]',
    "messagePreview" VARCHAR(100),
    "wasBlocked" BOOLEAN NOT NULL DEFAULT false,
    "ipHash" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SecurityIncident_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRiskProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "incidentCount" INTEGER NOT NULL DEFAULT 0,
    "isFlagged" BOOLEAN NOT NULL DEFAULT false,
    "flaggedAt" TIMESTAMP(3),
    "lastIncidentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserRiskProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConversationInsight" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "insightType" TEXT NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "confidence" DOUBLE PRECISION NOT NULL DEFAULT 0.7,
    "dimensions" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConversationInsight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendAssessment" (
    "id" TEXT NOT NULL,
    "targetUserId" TEXT NOT NULL,
    "assessorId" TEXT NOT NULL,
    "relationship" TEXT NOT NULL DEFAULT 'friend',
    "scoreLumen" DOUBLE PRECISION,
    "scoreAether" DOUBLE PRECISION,
    "scoreOrpheus" DOUBLE PRECISION,
    "scoreOrin" DOUBLE PRECISION,
    "scoreLyra" DOUBLE PRECISION,
    "scoreVara" DOUBLE PRECISION,
    "scoreChronos" DOUBLE PRECISION,
    "scoreKael" DOUBLE PRECISION,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserNote_userId_category_idx" ON "UserNote"("userId", "category");

-- CreateIndex
CREATE INDEX "UserNote_userId_importance_idx" ON "UserNote"("userId", "importance");

-- CreateIndex
CREATE INDEX "UserNote_expiresAt_idx" ON "UserNote"("expiresAt");

-- CreateIndex
CREATE INDEX "SecurityIncident_userId_idx" ON "SecurityIncident"("userId");

-- CreateIndex
CREATE INDEX "SecurityIncident_clerkUserId_idx" ON "SecurityIncident"("clerkUserId");

-- CreateIndex
CREATE INDEX "SecurityIncident_incidentType_idx" ON "SecurityIncident"("incidentType");

-- CreateIndex
CREATE INDEX "SecurityIncident_createdAt_idx" ON "SecurityIncident"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "UserRiskProfile_userId_key" ON "UserRiskProfile"("userId");

-- CreateIndex
CREATE INDEX "UserRiskProfile_isFlagged_idx" ON "UserRiskProfile"("isFlagged");

-- CreateIndex
CREATE INDEX "UserRiskProfile_totalScore_idx" ON "UserRiskProfile"("totalScore");

-- CreateIndex
CREATE INDEX "ConversationInsight_userId_insightType_idx" ON "ConversationInsight"("userId", "insightType");

-- CreateIndex
CREATE INDEX "ConversationInsight_sessionId_idx" ON "ConversationInsight"("sessionId");

-- CreateIndex
CREATE INDEX "FriendAssessment_targetUserId_idx" ON "FriendAssessment"("targetUserId");

-- CreateIndex
CREATE INDEX "FriendAssessment_assessorId_idx" ON "FriendAssessment"("assessorId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendAssessment_targetUserId_assessorId_key" ON "FriendAssessment"("targetUserId", "assessorId");

-- AddForeignKey
ALTER TABLE "UserNote" ADD CONSTRAINT "UserNote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SecurityIncident" ADD CONSTRAINT "SecurityIncident_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRiskProfile" ADD CONSTRAINT "UserRiskProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationInsight" ADD CONSTRAINT "ConversationInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConversationInsight" ADD CONSTRAINT "ConversationInsight_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendAssessment" ADD CONSTRAINT "FriendAssessment_targetUserId_fkey" FOREIGN KEY ("targetUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendAssessment" ADD CONSTRAINT "FriendAssessment_assessorId_fkey" FOREIGN KEY ("assessorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
