const express = require("express");
const studentController = require("../controllers/studentController");
const enrollmentController = require("../controllers/enrollmentController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware(["Admin", "Professor"]),
  studentController.getAllStudents
);

router.post("/", studentController.createStudent);

router.post(
  "/:id/courses/:courseID",
  authMiddleware(["Admin", "Student"]),
  enrollmentController.enrollStudent
);

module.exports = router;
