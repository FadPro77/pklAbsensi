/*
  Warnings:

  - You are about to drop the column `image` on the `pegawai` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pegawai" DROP COLUMN "image",
ADD COLUMN     "foto" TEXT NOT NULL DEFAULT '';
