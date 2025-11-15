-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('male', 'female');

-- CreateEnum
CREATE TYPE "jenis_izin" AS ENUM ('izin', 'sakit', 'cuti');

-- CreateEnum
CREATE TYPE "role_user" AS ENUM ('admin', 'hrd', 'manager');

-- CreateEnum
CREATE TYPE "status_kehadiran" AS ENUM ('hadir', 'izin', 'sakit', 'cuti', 'alpha', 'lembur');

-- CreateEnum
CREATE TYPE "status_pegawai" AS ENUM ('aktif', 'nonaktif');

-- CreateEnum
CREATE TYPE "status_pengajuan" AS ENUM ('menunggu', 'disetujui', 'ditolak');

-- CreateTable
CREATE TABLE "absensi" (
    "id" SERIAL NOT NULL,
    "pegawaiId" INTEGER,
    "tanggal" DATE NOT NULL,
    "jam_masuk" TIME(6),
    "jam_keluar" TIME(6),
    "status" "status_kehadiran" DEFAULT 'hadir',
    "keterangan" TEXT,

    CONSTRAINT "absensi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "izin_cuti" (
    "id" SERIAL NOT NULL,
    "pegawaiId" INTEGER,
    "tanggal_mulai" DATE NOT NULL,
    "tanggal_selesai" DATE NOT NULL,
    "jenis" "jenis_izin" NOT NULL,
    "alasan" TEXT,
    "status_pengajuan" "status_pengajuan" DEFAULT 'menunggu',

    CONSTRAINT "izin_cuti_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log_activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "aktivitas" VARCHAR(255),
    "waktu" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "log_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pegawai" (
    "id" SERIAL NOT NULL,
    "nip" VARCHAR(20),
    "nama" VARCHAR(100) NOT NULL,
    "jabatan" VARCHAR(100),
    "password" VARCHAR(255) NOT NULL,
    "foto" VARCHAR(255),
    "status" "status_pegawai" DEFAULT 'aktif',
    "tanggal_masuk" DATE,

    CONSTRAINT "pegawai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "role_user" DEFAULT 'hrd',
    "nama_lengkap" VARCHAR(100),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_absensi_pegawai_tanggal" ON "absensi"("pegawaiId", "tanggal");

-- CreateIndex
CREATE UNIQUE INDEX "unique_absensi_per_hari" ON "absensi"("pegawaiId", "tanggal");

-- CreateIndex
CREATE INDEX "idx_izin_pegawai" ON "izin_cuti"("pegawaiId");

-- CreateIndex
CREATE INDEX "idx_log_user" ON "log_activity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "absensi" ADD CONSTRAINT "absensi_id_pegawai_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "pegawai"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "izin_cuti" ADD CONSTRAINT "izin_cuti_id_pegawai_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "pegawai"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "log_activity" ADD CONSTRAINT "log_activity_id_user_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
