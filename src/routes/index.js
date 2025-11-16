const express = require("express");
const authRouter = require("./auth");
const employeesRouter = require("./employees");
const absentRouter = require("./absent");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employees", employeesRouter);
router.use("/absent", absentRouter);

module.exports = router;
