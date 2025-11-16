const employeesService = require("../services/employees");
const { successResponse } = require("../utils/response");

exports.getEmployees = async (req, res, next) => {
  const data = await employeesService.getEmployees(
    req.query?.nip,
    req.query?.nama,
    req.query?.jabatan,
    req.query?.status,
    req.query?.tanggal_masuk,
  );
  successResponse(res, data);
};

exports.getEmployeesById = async (req, res, next) => {
  const data = await employeesService.getEmployeesById(req.params.id);
  successResponse(res, data);
};

exports.createEmployee = async (req, res, next) => {
  const data = await employeesService.createEmployee(req.body, req.files);
  successResponse(res, {
    message: "Employee successfully Added!",
    data,
  });
};

exports.updateEmployee = async (req, res, next) => {
  const { id } = req.params;

  const data = await employeesService.updateEmployee(id, req.body, req.files);
  successResponse(res, {
    message: "Employee Updated successfully!",
    data,
  });
};

exports.deleteEmployee = async (req, res, next) => {
  const data = await employeesService.deleteEmployee(req.params.id);

  successResponse(res, {
    message: "Employee Deleted successfully!",
    data,
  });
};
