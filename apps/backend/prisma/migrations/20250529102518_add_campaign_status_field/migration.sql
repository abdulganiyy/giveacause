/*
  Warnings:

  - The values [PHOTO,PDF,DOC] on the enum `DocumentType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `stripeAccountId` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `stripeDashboardLink` on the `Campaign` table. All the data in the column will be lost.
  - You are about to drop the column `stripePaymentIntentId` on the `Donation` table. All the data in the column will be lost.
  - You are about to drop the column `stripeTransferId` on the `Payout` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "DocumentType_new" AS ENUM ('NIN', 'BVN', 'PASSPORT', 'OTHER');
ALTER TABLE "Document" ALTER COLUMN "type" TYPE "DocumentType_new" USING ("type"::text::"DocumentType_new");
ALTER TYPE "DocumentType" RENAME TO "DocumentType_old";
ALTER TYPE "DocumentType_new" RENAME TO "DocumentType";
DROP TYPE "DocumentType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_userId_fkey";

-- AlterTable
ALTER TABLE "Campaign" DROP COLUMN "stripeAccountId",
DROP COLUMN "stripeDashboardLink";

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "type",
ADD COLUMN     "type" "DocumentType" NOT NULL;

-- AlterTable
ALTER TABLE "Donation" DROP COLUMN "stripePaymentIntentId",
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Payout" DROP COLUMN "stripeTransferId",
ADD COLUMN     "paystackTransferId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId",
ADD COLUMN     "accountName" TEXT,
ADD COLUMN     "accountNumber" TEXT,
ADD COLUMN     "bankName" TEXT,
ADD COLUMN     "paystackSubAccountId" TEXT;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
