const express = require("express");
const absentController = require("../controllers/absent");
const absentValidation = require("../middlewares/absent");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    absentValidation.validateGetAbsent,
    absentController.getAbsent,
  )
  .post(
    authorization(adminRole, userRole),
    absentValidation.validateCreateAbsent,
    absentController.createAbsent,
  );

router
  .route("/:id")
  .get(absentValidation.validateGetAbsentById, absentController.getAbsentById)
  .put(absentValidation.validateUpdateAbsent, absentController.updateAbsent);

module.exports = router;
