const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getEmployees = async (nip, nama, jabatan, status, tanggal_masuk) => {
  let query = {};

  let andQuery = [];

  if (nip) {
    andQuery.push({
      nip: { contains: nip, mode: "insensitive" },
    });
  }
  if (nama) {
    andQuery.push({
      nama: { contains: nama, mode: "insensitive" },
    });
  }
  if (jabatan) {
    andQuery.push({
      jabatan: { contains: jabatan, mode: "insensitive" },
    });
  }
  if (status) {
    andQuery.push({
      status: { equals: status },
    });
  }
  if (tanggal_masuk) {
    andQuery.push({
      tanggal_masuk: { equals: new Date(tanggal_masuk) },
    });
  }

  if (andQuery.length > 0) {
    query.where = {
      ...query.where,
      AND: andQuery,
    };
  }

  const searchedEmployees = await prisma.pegawai.findMany(query);
  return searchedEmployees;
};

exports.getEmployeesById = async (id) => {
  const searchedEmployeesById = await prisma.pegawai.findUnique({
    where: { id: Number(id) },
  });
  return searchedEmployeesById;
};

exports.createEmployees = async (data) => {
  const newEmployee = await prisma.pegawai.create({
    data,
  });

  return newEmployee;
};

exports.updateEmployee = async (id, data) => {
  const updatedEmployee = await prisma.pegawai.update({
    where: {
      id: Number(id),
    },
    data: {
      nip: data.nip,
      nama: data.nama,
      jabatan: data.jabatan,
      status: data.status,
      tanggal_masuk: data.tanggal_masuk,
      foto: data.foto,
    },
  });

  return updatedEmployee;
};

exports.deleteEmployee = async (id) => {
  const deletedEmployee = await prisma.pegawai.delete({
    where: { id: Number(id) },
  });

  return deletedEmployee;
};
