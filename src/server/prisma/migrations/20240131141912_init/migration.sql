-- CreateTable
CREATE TABLE "Fave" (
    "favedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unfavedOn" TIMESTAMP(3),
    "userUid" TEXT NOT NULL,
    "medicationId" INTEGER NOT NULL,

    CONSTRAINT "Fave_pkey" PRIMARY KEY ("userUid","medicationId")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "nameBrand" TEXT NOT NULL,
    "nameGeneric" TEXT NOT NULL,
    "drugClass" TEXT NOT NULL,
    "prescribedFor" TEXT NOT NULL,
    "sideEffects" TEXT NOT NULL,
    "image" TEXT NOT NULL,

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_nameBrand_key" ON "Medication"("nameBrand");

-- CreateIndex
CREATE UNIQUE INDEX "Medication_nameGeneric_key" ON "Medication"("nameGeneric");

-- CreateIndex
CREATE UNIQUE INDEX "Condition_name_key" ON "Condition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ConditionToMedication_AB_unique" ON "_ConditionToMedication"("A", "B");

-- CreateIndex
CREATE INDEX "_ConditionToMedication_B_index" ON "_ConditionToMedication"("B");

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_userUid_fkey" FOREIGN KEY ("userUid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fave" ADD CONSTRAINT "Fave_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionToMedication" ADD CONSTRAINT "_ConditionToMedication_A_fkey" FOREIGN KEY ("A") REFERENCES "Condition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConditionToMedication" ADD CONSTRAINT "_ConditionToMedication_B_fkey" FOREIGN KEY ("B") REFERENCES "Medication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
