const express = require("express");
const professorController = require("../controllers/professorController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", professorController.createProfessor);
router.patch("/:id", professorController.updateProfessorSpecialization);
router.delete("/:id", professorController.deleteProfessor);
router.get("/:id", professorController.getProfessorByPersonID);
router.get(
  "/:id/students",
  authMiddleware(["Professor", "Admin"]),
  professorController.getStudentsEnrolled
);
router.post(
  "/:id/courses/:courseID",
  professorController.assignCourseToProfessor
);

module.exports = router;
