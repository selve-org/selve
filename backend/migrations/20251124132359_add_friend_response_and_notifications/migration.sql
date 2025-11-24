-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clerkId" TEXT NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "archivedAt" TIMESTAMP(3),
    "archiveMetadata" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "personality" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "category" TEXT,
    "isThirdParty" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "answeredById" TEXT NOT NULL,
    "aboutUserId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "notSure" BOOLEAN NOT NULL DEFAULT false,
    "responseTime" INTEGER,
    "qualityScore" DOUBLE PRECISION,
    "flaggedMalicious" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendResponse" (
    "id" TEXT NOT NULL,
    "inviteId" TEXT NOT NULL,
    "responses" JSONB NOT NULL,
    "qualityScore" DOUBLE PRECISION NOT NULL,
    "totalTime" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FriendResponse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link" TEXT,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InviteLink" (
    "id" TEXT NOT NULL,
    "inviteCode" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "targetId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3),
    "friendEmail" TEXT,
    "friendNickname" TEXT,
    "relationshipType" TEXT,
    "openedAt" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "abandonedAt" TIMESTAMP(3),
    "deviceType" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InviteLink_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "AssessmentSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "clerkUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'in-progress',
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
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
    "archivedAt" TIMESTAMP(3),

    CONSTRAINT "AssessmentSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssessmentResult" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "clerkUserId" TEXT,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,
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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendResponse_inviteId_key" ON "FriendResponse"("inviteId");

-- CreateIndex
CREATE INDEX "FriendResponse_completedAt_idx" ON "FriendResponse"("completedAt");

-- CreateIndex
CREATE INDEX "Notification_userId_read_idx" ON "Notification"("userId", "read");

-- CreateIndex
CREATE INDEX "Notification_userId_createdAt_idx" ON "Notification"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "InviteLink_inviteCode_key" ON "InviteLink"("inviteCode");

-- CreateIndex
CREATE INDEX "InviteLink_inviterId_status_idx" ON "InviteLink"("inviterId", "status");

-- CreateIndex
CREATE INDEX "InviteLink_expiresAt_idx" ON "InviteLink"("expiresAt");

-- CreateIndex
CREATE INDEX "InviteLink_ipAddress_createdAt_idx" ON "InviteLink"("ipAddress", "createdAt");

-- CreateIndex
CREATE INDEX "RateLimit_userId_windowEnd_idx" ON "RateLimit"("userId", "windowEnd");

-- CreateIndex
CREATE UNIQUE INDEX "RateLimit_userId_windowStart_key" ON "RateLimit"("userId", "windowStart");

-- CreateIndex
CREATE INDEX "AssessmentSession_clerkUserId_isCurrent_idx" ON "AssessmentSession"("clerkUserId", "isCurrent");

-- CreateIndex
CREATE INDEX "AssessmentSession_clerkUserId_completedAt_idx" ON "AssessmentSession"("clerkUserId", "completedAt");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentResult_sessionId_key" ON "AssessmentResult"("sessionId");

-- CreateIndex
CREATE INDEX "AssessmentResult_userId_idx" ON "AssessmentResult"("userId");

-- CreateIndex
CREATE INDEX "AssessmentResult_clerkUserId_idx" ON "AssessmentResult"("clerkUserId");

-- CreateIndex
CREATE INDEX "AssessmentResult_clerkUserId_isCurrent_idx" ON "AssessmentResult"("clerkUserId", "isCurrent");

-- CreateIndex
CREATE UNIQUE INDEX "AssessmentTemplate_name_key" ON "AssessmentTemplate"("name");

-- CreateIndex
CREATE INDEX "AssessmentTemplate_isActive_idx" ON "AssessmentTemplate"("isActive");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_aboutUserId_fkey" FOREIGN KEY ("aboutUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_answeredById_fkey" FOREIGN KEY ("answeredById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendResponse" ADD CONSTRAINT "FriendResponse_inviteId_fkey" FOREIGN KEY ("inviteId") REFERENCES "InviteLink"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteLink" ADD CONSTRAINT "InviteLink_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InviteLink" ADD CONSTRAINT "InviteLink_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssessmentResult" ADD CONSTRAINT "AssessmentResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "AssessmentSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
