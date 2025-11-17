const express = require("express");
const authRouter = require("./auth");
const employeesRouter = require("./employees");
const absentRouter = require("./absent");
const leavesRouter = require("./leaves");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/employees", employeesRouter);
router.use("/absent", absentRouter);
router.use("/leaves", leavesRouter);

module.exports = router;
