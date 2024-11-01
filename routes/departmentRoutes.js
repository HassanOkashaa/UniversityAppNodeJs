// routes/departmentRoutes.js
const express = require("express");
const departmentController = require("../controllers/departmentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  authMiddleware(["Admin"]),
  departmentController.createDepartment
);

router.get(
  "/:id",
  authMiddleware(["Professor", "Admin"]),
  departmentController.getDepartmentById
);

module.exports = router;
