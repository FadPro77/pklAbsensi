/*
  Warnings:

  - The values [hrd,manager] on the enum `role_user` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "role_user_new" AS ENUM ('admin', 'user');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "role_user_new" USING ("role"::text::"role_user_new");
ALTER TYPE "role_user" RENAME TO "role_user_old";
ALTER TYPE "role_user_new" RENAME TO "role_user";
DROP TYPE "public"."role_user_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'user';
