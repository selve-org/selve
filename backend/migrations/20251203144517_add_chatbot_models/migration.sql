-- CreateTable
CREATE TABLE "NewsletterSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clerkUserId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "preferences" JSONB,
    "source" TEXT,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "title" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "totalTokens" INTEGER NOT NULL DEFAULT 0,
    "compressionCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastMessageAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "tokenCount" INTEGER NOT NULL DEFAULT 0,
    "model" TEXT,
    "provider" TEXT,
    "cost" DOUBLE PRECISION,
    "retrievedContextIds" JSONB,
    "confidenceTags" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCompressed" BOOLEAN NOT NULL DEFAULT false,
    "compressedAt" TIMESTAMP(3),

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EpisodicMemory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "keyInsights" JSONB NOT NULL,
    "unresolvedTopics" JSONB,
    "emotionalState" TEXT,
    "sourceMessageIds" TEXT[],
    "compressionModel" TEXT NOT NULL,
    "compressionCost" DOUBLE PRECISION,
    "vectorId" TEXT,
    "embedded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spanStart" TIMESTAMP(3) NOT NULL,
    "spanEnd" TIMESTAMP(3) NOT NULL,
    "lastAccessedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EpisodicMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SemanticMemory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT,
    "category" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "confidence" TEXT NOT NULL,
    "evidenceCount" INTEGER NOT NULL DEFAULT 1,
    "firstObservedAt" TIMESTAMP(3) NOT NULL,
    "lastObservedAt" TIMESTAMP(3) NOT NULL,
    "sourceMessageIds" TEXT[],
    "relatedDimension" TEXT,
    "vectorId" TEXT,
    "embedded" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "SemanticMemory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContentValidation" (
    "id" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "originalContent" TEXT NOT NULL,
    "validatedContent" TEXT NOT NULL,
    "validationStatus" TEXT NOT NULL DEFAULT 'pending',
    "validatedBy" TEXT,
    "validationNotes" TEXT,
    "isIndexed" BOOLEAN NOT NULL DEFAULT false,
    "vectorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validatedAt" TIMESTAMP(3),

    CONSTRAINT "ContentValidation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotKnowledgeSync" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "syncType" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "vectorId" TEXT,
    "errorMessage" TEXT,
    "syncedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotKnowledgeSync_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatbotAnalytics" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "messageCount" INTEGER NOT NULL DEFAULT 0,
    "totalTokensUsed" INTEGER NOT NULL DEFAULT 0,
    "totalCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "avgResponseTime" DOUBLE PRECISION,
    "compressionTriggers" INTEGER NOT NULL DEFAULT 0,
    "provider" TEXT,
    "model" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatbotAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsletterSubscriber_email_key" ON "NewsletterSubscriber"("email");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_status_idx" ON "NewsletterSubscriber"("status");

-- CreateIndex
CREATE INDEX "NewsletterSubscriber_clerkUserId_idx" ON "NewsletterSubscriber"("clerkUserId");

-- CreateIndex
CREATE INDEX "ChatSession_userId_status_lastMessageAt_idx" ON "ChatSession"("userId", "status", "lastMessageAt");

-- CreateIndex
CREATE INDEX "ChatSession_clerkUserId_status_idx" ON "ChatSession"("clerkUserId", "status");

-- CreateIndex
CREATE INDEX "ChatMessage_sessionId_createdAt_idx" ON "ChatMessage"("sessionId", "createdAt");

-- CreateIndex
CREATE INDEX "EpisodicMemory_userId_spanStart_idx" ON "EpisodicMemory"("userId", "spanStart");

-- CreateIndex
CREATE INDEX "SemanticMemory_userId_confidence_isActive_idx" ON "SemanticMemory"("userId", "confidence", "isActive");

-- CreateIndex
CREATE INDEX "ContentValidation_sourceType_validationStatus_idx" ON "ContentValidation"("sourceType", "validationStatus");

-- CreateIndex
CREATE INDEX "ChatbotKnowledgeSync_userId_syncType_status_idx" ON "ChatbotKnowledgeSync"("userId", "syncType", "status");

-- CreateIndex
CREATE INDEX "ChatbotAnalytics_userId_date_idx" ON "ChatbotAnalytics"("userId", "date");

-- CreateIndex
CREATE INDEX "ChatbotAnalytics_provider_model_date_idx" ON "ChatbotAnalytics"("provider", "model", "date");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EpisodicMemory" ADD CONSTRAINT "EpisodicMemory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SemanticMemory" ADD CONSTRAINT "SemanticMemory_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
