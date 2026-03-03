/*
  Warnings:

  - You are about to drop the column `createdAt` on the `MetricHistory` table. All the data in the column will be lost.
  - You are about to drop the column `metrics` on the `MetricHistory` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `MetricHistory` table. All the data in the column will be lost.
  - You are about to drop the column `recordedAt` on the `MetricHistory` table. All the data in the column will be lost.
  - You are about to drop the column `serviceName` on the `MetricHistory` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `MetricHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MetricHistory_projectId_serviceId_recordedAt_idx";

-- AlterTable
ALTER TABLE "MetricHistory" DROP COLUMN "createdAt",
DROP COLUMN "metrics",
DROP COLUMN "projectId",
DROP COLUMN "recordedAt",
DROP COLUMN "serviceName",
ADD COLUMN     "clientId" TEXT NOT NULL,
ADD COLUMN     "entryDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "history" JSONB NOT NULL DEFAULT '[]';

-- CreateIndex
CREATE INDEX "MetricHistory_clientId_serviceId_entryDate_idx" ON "MetricHistory"("clientId", "serviceId", "entryDate");
