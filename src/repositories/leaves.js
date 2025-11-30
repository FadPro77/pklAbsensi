const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getLeaves = async (
  pegawaiId,
  tanggal_mulai,
  tanggal_selesai,
  jenis,
  alasan,
  status_pengajuan,
) => {
  let query = {};
  let where = {};
  let andQuery = [];

  if (pegawaiId) {
    andQuery.push({
      pegawaiId: { equals: pegawaiId },
    });
  }
  if (tanggal_mulai) {
    andQuery.push({
      tanggal_mulai: { equals: new Date(tanggal_mulai) },
    });
  }
  if (tanggal_selesai) {
    andQuery.push({
      tanggal_selesai: { equals: new Date(tanggal_selesai) },
    });
  }
  if (jenis) {
    andQuery.push({
      jenis: { equals: jenis },
    });
  }
  if (alasan) {
    andQuery.push({
      alasan: { equals: alasan },
    });
  }
  if (status_pengajuan) {
    andQuery.push({
      status_pengajuan: { equals: status_pengajuan },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      ...query.where,
      AND: andQuery,
    };
  }

  const searchedLeaves = await prisma.izin_cuti.findMany({
    where,
    include: {
      pegawai: true,
    },
  });
  return searchedLeaves;
};

exports.getLeavesById = async (id) => {
  const searchedLeavesById = await prisma.izin_cuti.findUnique({
    where: { id: Number(id) },
  });
  return searchedLeavesById;
};

exports.createLeaves = async (data) => {
  const newLeaves = await prisma.izin_cuti.create({
    data,
  });

  return newLeaves;
};

exports.updateLeaves = async (id, data) => {
  const updatedLeaves = await prisma.izin_cuti.update({
    where: {
      id: Number(id),
    },
    data: {
      status_pengajuan: data.status_pengajuan,
    },
  });

  return updatedLeaves;
};
