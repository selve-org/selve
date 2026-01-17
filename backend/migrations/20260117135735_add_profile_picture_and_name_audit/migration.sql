-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profilePicture" TEXT;

-- CreateTable
CREATE TABLE "NameChangeAudit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "oldName" TEXT,
    "newName" TEXT NOT NULL,
    "changedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "NameChangeAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NameChangeAudit_userId_changedAt_idx" ON "NameChangeAudit"("userId", "changedAt");

-- AddForeignKey
ALTER TABLE "NameChangeAudit" ADD CONSTRAINT "NameChangeAudit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
