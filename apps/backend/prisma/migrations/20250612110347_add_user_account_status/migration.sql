-- CreateEnum
CREATE TYPE "UserAccountStatus" AS ENUM ('PENDING', 'COMPLETED', 'REJECTED');

-- AlterTable
ALTER TABLE "Campaign" ALTER COLUMN "isActive" SET DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserAccountStatus" NOT NULL DEFAULT 'PENDING';
