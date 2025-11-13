/*
  Warnings:

  - You are about to drop the `QuestionnaireAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireCheckpoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireSection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuestionnaireSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuestionnaireAnswer" DROP CONSTRAINT "QuestionnaireAnswer_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireCheckpoint" DROP CONSTRAINT "QuestionnaireCheckpoint_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "QuestionnaireQuestion" DROP CONSTRAINT "QuestionnaireQuestion_sectionId_fkey";

-- DropTable
DROP TABLE "QuestionnaireAnswer";

-- DropTable
DROP TABLE "QuestionnaireCheckpoint";

-- DropTable
DROP TABLE "QuestionnaireQuestion";

-- DropTable
DROP TABLE "QuestionnaireSection";

-- DropTable
DROP TABLE "QuestionnaireSession";
