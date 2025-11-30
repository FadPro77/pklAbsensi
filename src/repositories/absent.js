const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAbsent = async (
  pegawaiId,
  tanggal,
  jam_masuk,
  jam_keluar,
  status,
  keterangan,
) => {
  let query = {};
  let where = {};
  let andQuery = [];

  if (pegawaiId) {
    andQuery.push({
      pegawaiId: { equals: Number(pegawaiId) },
    });
  }
  if (tanggal) {
    andQuery.push({
      tanggal: { equals: new Date(tanggal) },
    });
  }
  if (jam_masuk) {
    andQuery.push({
      jam_masuk: { equals: jam_masuk },
    });
  }
  if (jam_keluar) {
    andQuery.push({
      jam_keluar: { equals: jam_keluar },
    });
  }
  if (status) {
    andQuery.push({
      status: { equals: status },
    });
  }
  if (keterangan) {
    andQuery.push({
      keterangan: { contains: keterangan, mode: "insensitive" },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      ...query.where,
      AND: andQuery,
    };
  }

  const searchedAbsent = await prisma.absensi.findMany({
    where,
    include: {
      pegawai: true,
    },
  });
  return searchedAbsent;
};

exports.getAbsentById = async (id) => {
  const searchedAbsentById = await prisma.absensi.findUnique({
    where: { id: Number(id) },
  });
  return searchedAbsentById;
};

exports.createAbsent = async (data) => {
  const newAbsent = await prisma.absensi.create({
    data,
  });

  return newAbsent;
};

exports.updateAbsent = async (id, data) => {
  return prisma.absensi.update({
    where: { id: Number(id) },
    data: {
      status: data.status,
      keterangan: data.keterangan,
      jam_keluar: data.jam_keluar,
    },
  });
};
