const express = require("express");
const leavesController = require("../controllers/leaves");
const leavesValidation = require("../middlewares/leaves");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    leavesValidation.validateGetLeaves,
    leavesController.getLeaves,
  )
  .post(
    authorization(adminRole, userRole),
    leavesValidation.validateCreateLeaves,
    leavesController.createLeaves,
  );

router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    leavesValidation.validateGetLeavesById,
    leavesController.getLeavesById,
  );

module.exports = router;
