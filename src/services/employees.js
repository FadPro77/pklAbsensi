const employeesRepository = require("../repositories/employees");
const { imageUpload, imageDelete } = require("../utils/imageKit");
const {
  NotFoundError,
  InternalServerError,
  BadRequestError,
} = require("../utils/request");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getEmployees = async (nip, nama, jabatan, status, tanggal_masuk) => {
  const employees = await employeesRepository.getEmployees(
    nip,
    nama,
    jabatan,
    status,
    tanggal_masuk,
  );
  if (!employees.length) {
    throw new NotFoundError("No employees found with the provided criteria");
  }
  return employees;
};

exports.getEmployeesById = async (id) => {
  const data = await employeesRepository.getEmployeesById(id);
  if (!data) {
    throw new NotFoundError("Employee is Not Found!");
  }
  return data;
};

exports.createEmployee = async (data, file) => {
  if (file?.foto) {
    data.foto = await imageUpload(file.foto);
  }
  data.tanggal_masuk = new Date(data.tanggal_masuk);
  const existing = await prisma.pegawai.findUnique({
    where: { nip: data.nip },
  });

  if (existing) {
    throw new BadRequestError("NIP sudah terdaftar!");
  }

  return employeesRepository.createEmployees(data);
};

exports.updateEmployee = async (id, data, file) => {
  const existingEmployee = await employeesRepository.getEmployeesById(id);
  if (!existingEmployee) {
    throw new NotFoundError("Employee is Not Found!");
  }

  data = {
    ...existingEmployee,
    ...data,
  };
  if (file?.foto) {
    data.foto = await imageUpload(file.foto);
  }
  data.tanggal_masuk = new Date(data.tanggal_masuk);
  const updatedEmployee = await employeesRepository.updateEmployee(id, data);
  if (!updatedEmployee) {
    throw new InternalServerError(["Failed to update Employee!"]);
  }
  return updatedEmployee;
};

exports.deleteEmployee = async (id) => {
  const existingEmployee = await employeesRepository.getEmployeesById(id);
  if (!existingEmployee) {
    throw new NotFoundError("Employee is Not Found!");
  }

  const deletedEmployee = await employeesRepository.deleteEmployee(id);
  if (!deletedEmployee) {
    throw new InternalServerError(["Failed to delete employee!"]);
  }

  return existingEmployee;
};
