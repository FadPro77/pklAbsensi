const express = require("express");
const {
  validateRegister,
  validateLogin,
  authorization,
  validateAdmin,
  validateRegisterAdmin,
} = require("../middlewares/auth");
const {
  register,
  login,
  getProfile,
  changeUserRole,
  registerAdmin,
} = require("../controllers/auth");
const { adminRole, userRole } = require("../constant/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/register/admin", validateRegisterAdmin, registerAdmin);
router.post("/login", validateLogin, login);
router.get("/profile", authorization(adminRole, userRole), getProfile);
router.put(
  "/change-role",
  authorization(adminRole),
  validateAdmin,
  changeUserRole,
);

module.exports = router;
