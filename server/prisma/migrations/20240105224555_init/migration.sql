/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- DropTable
DROP TABLE "Post";

-- DropTable
DROP TABLE "Profile";

-- CreateTable
CREATE TABLE "Fave" (
    "faved_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unfaved_on" TIMESTAMP(3),
    "userId" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,

    CONSTRAINT "Fave_pkey" PRIMARY KEY ("userId","medicationId")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "nameBrand" TEXT NOT NULL,
    "nameGeneric" TEXT NOT NULL,
    "drugClass" TEXT NOT NULL,
    "prescribedFor" TEXT NOT NULL,
    "sideEffects" TEXT NOT NULL,
    "pillImage" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Condition" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Condition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ConditionToMedication" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ConditionToMedication_AB_unique" ON "_ConditionToMedication"("A", "B");

-- CreateIndex
CREATE INDEX "_ConditionToMedication_B_index" ON "_ConditionToMedication"("B");

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionToMedication" ADD CONSTRAINT "_ConditionToMedication_A_fkey" FOREIGN KEY ("A") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionToMedication" ADD CONSTRAINT "_ConditionToMedication_B_fkey" FOREIGN KEY ("B") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
