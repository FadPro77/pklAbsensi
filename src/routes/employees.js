const express = require("express");
const employeesController = require("../controllers/employees");
const employeesValidation = require("../middlewares/employees");
const { authorization } = require("../middlewares/auth");
const { adminRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(
    employeesValidation.validateGetEmployees,
    employeesController.getEmployees,
  )
  .post(
    authorization(adminRole),
    employeesValidation.validateCreateEmployee,
    employeesController.createEmployee,
  );

router
  .route("/:id")
  .get(
    employeesValidation.validateGetEmployeesById,
    employeesController.getEmployeesById,
  )
  .put(
    authorization(adminRole),
    employeesValidation.validateUpdateEmployee,
    employeesController.updateEmployee,
  )
  .delete(
    authorization(adminRole),
    employeesValidation.validateDeleteEmployee,
    employeesController.deleteEmployee,
  );

module.exports = router;
