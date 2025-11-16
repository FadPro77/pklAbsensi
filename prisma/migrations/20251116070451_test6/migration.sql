/*
  Warnings:

  - You are about to drop the column `foto` on the `pegawai` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "foto",
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';
