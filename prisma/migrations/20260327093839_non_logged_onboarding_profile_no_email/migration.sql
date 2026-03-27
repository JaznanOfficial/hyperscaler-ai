-- CreateTable
CREATE TABLE "NonLoggedOnboardingProfile" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "businessStage" TEXT NOT NULL,
    "websiteUrl" TEXT,
    "monthlyRevenueRange" TEXT,
    "services" JSONB NOT NULL DEFAULT '[]',
    "discoverySource" TEXT NOT NULL DEFAULT 'unknown',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NonLoggedOnboardingProfile_pkey" PRIMARY KEY ("id")
);
