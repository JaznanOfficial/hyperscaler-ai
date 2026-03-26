-- AlterTable
ALTER TABLE "User" ADD COLUMN     "get_started" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "OnboardingProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "email" TEXT,
    "businessName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "businessStage" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "monthlyRevenueRange" TEXT,
    "services" JSONB NOT NULL DEFAULT '[]',
    "discoverySource" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnboardingProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingProfile_userId_key" ON "OnboardingProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OnboardingProfile_email_key" ON "OnboardingProfile"("email");
