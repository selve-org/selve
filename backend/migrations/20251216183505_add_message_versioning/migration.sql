-- AlterTable
ALTER TABLE "ChatMessage" ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "langfuseTraceId" TEXT,
ADD COLUMN     "parentMessageId" TEXT,
ADD COLUMN     "regenerationIndex" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "regenerationType" TEXT;

-- CreateIndex
CREATE INDEX "ChatMessage_langfuseTraceId_idx" ON "ChatMessage"("langfuseTraceId");

-- CreateIndex
CREATE INDEX "ChatMessage_sessionId_isActive_idx" ON "ChatMessage"("sessionId", "isActive");

-- CreateIndex
CREATE INDEX "ChatMessage_groupId_idx" ON "ChatMessage"("groupId");

-- CreateIndex
CREATE INDEX "ChatMessage_parentMessageId_idx" ON "ChatMessage"("parentMessageId");

-- AddForeignKey
ALTER TABLE "ChatMessage" ADD CONSTRAINT "ChatMessage_parentMessageId_fkey" FOREIGN KEY ("parentMessageId") REFERENCES "ChatMessage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
