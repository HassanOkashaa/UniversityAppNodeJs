const express = require("express");
const professorController = require("../controllers/professorController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", professorController.createProfessor);
router.patch(
  "/:id",
  authMiddleware(["Professor", "Admin"]),
  professorController.updateProfessorSpecialization
);
router.delete(
  "/:id",
  authMiddleware(["Professor", "Admin"]),
  professorController.deleteProfessor
);
router.get(
  "/:id",
  authMiddleware(["Admin"]),
  professorController.getProfessorByID
);
router.get(
  "/:id/students",
  authMiddleware(["Professor", "Admin"]),
  professorController.getStudentsEnrolled
);
router.post(
  "/:id/courses/:courseID",
  authMiddleware(["Professor", "Admin"]),
  professorController.assignCourseToProfessor
);

module.exports = router;
