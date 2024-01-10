/*
  Warnings:

  - A unique constraint covering the columns `[nameBrand]` on the table `Medication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Medication_nameBrand_key" ON "Medication"("nameBrand");
