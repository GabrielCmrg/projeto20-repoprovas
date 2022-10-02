/*
  Warnings:

  - You are about to drop the column `teachersDisciplineId` on the `Test` table. All the data in the column will be lost.
  - Added the required column `teacherDisciplineId` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_teachersDisciplineId_fkey";

-- AlterTable
ALTER TABLE "Test" DROP COLUMN "teachersDisciplineId",
ADD COLUMN     "teacherDisciplineId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teacherDisciplineId_fkey" FOREIGN KEY ("teacherDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
