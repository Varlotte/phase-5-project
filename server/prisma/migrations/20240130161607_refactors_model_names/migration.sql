/*
  Warnings:

  - You are about to drop the column `faved_on` on the `Fave` table. All the data in the column will be lost.
  - You are about to drop the column `unfaved_on` on the `Fave` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Fave" DROP COLUMN "faved_on",
DROP COLUMN "unfaved_on",
ADD COLUMN     "favedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "unfavedOn" TIMESTAMP(3);
