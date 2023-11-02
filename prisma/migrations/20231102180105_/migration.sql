/*
  Warnings:

  - Added the required column `currentQuestion` to the `QuizResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "QuizResult" ADD COLUMN     "currentQuestion" INTEGER NOT NULL;
