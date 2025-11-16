/*
  Warnings:

  - A unique constraint covering the columns `[pegawaiId,tanggal]` on the table `absensi` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "unique_absensi_per_hari" ON "absensi"("pegawaiId", "tanggal");
