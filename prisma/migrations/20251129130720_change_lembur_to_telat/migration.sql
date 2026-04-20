/*
  Warnings:

  - The values [lembur] on the enum `status_kehadiran` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "status_kehadiran_new" AS ENUM ('hadir', 'izin', 'sakit', 'cuti', 'alpha', 'telat');
ALTER TABLE "public"."absensi" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "absensi" ALTER COLUMN "status" TYPE "status_kehadiran_new" USING ("status"::text::"status_kehadiran_new");
ALTER TYPE "status_kehadiran" RENAME TO "status_kehadiran_old";
ALTER TYPE "status_kehadiran_new" RENAME TO "status_kehadiran";
DROP TYPE "public"."status_kehadiran_old";
ALTER TABLE "absensi" ALTER COLUMN "status" SET DEFAULT 'hadir';
COMMIT;
