/*
  Warnings:

  - You are about to drop the column `drugClass` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `pillImage` on the `Medication` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nameGeneric]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "drugClass",
DROP COLUMN "pillImage",
ADD COLUMN     "class" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Medication_nameGeneric_key" ON "Medication"("nameGeneric");
