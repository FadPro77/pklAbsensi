/*
  Warnings:

  - A unique constraint covering the columns `[nip]` on the table `pegawai` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nip` on table `pegawai` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "pegawai" ALTER COLUMN "nip" SET NOT NULL,
ALTER COLUMN "foto" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "pegawai_nip_key" ON "pegawai"("nip");
