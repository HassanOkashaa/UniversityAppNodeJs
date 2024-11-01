// routes/departmentRoutes.js
const express = require("express");
const departmentController = require("../controllers/departmentController");

const router = express.Router();

router.post("/", departmentController.createDepartment);

router.get("/:id", departmentController.getDepartmentById);

module.exports = router;
