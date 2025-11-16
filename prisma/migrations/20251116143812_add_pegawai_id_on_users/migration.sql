-- AlterTable
ALTER TABLE "users" ADD COLUMN     "pegawaiId" INTEGER;

-- CreateIndex
CREATE INDEX "idx_user_pegawai" ON "users"("pegawaiId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_pegawaiId_fkey" FOREIGN KEY ("pegawaiId") REFERENCES "pegawai"("id") ON DELETE SET NULL ON UPDATE CASCADE;
