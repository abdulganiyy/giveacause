/*
  Warnings:

  - Added the required column `currency` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "status" TEXT;
