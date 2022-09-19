-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pdfUrl" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "teachersDisciplineId" INTEGER NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_teachersDisciplineId_fkey" FOREIGN KEY ("teachersDisciplineId") REFERENCES "teachersDisciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
