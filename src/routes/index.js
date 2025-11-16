const express = require("express");
const authRouter = require("./auth");
const employeesRouter = require("./employees");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employees", employeesRouter);
module.exports = router;
