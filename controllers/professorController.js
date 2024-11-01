const ProfessorService = require("../services/professorService");

const createProfessor = async (req, res) => {
  const missingFields = [];

  if (!req.body.username) missingFields.push("username");
  if (!req.body.password) missingFields.push("password");
  if (!req.body.name) missingFields.push("name");
  if (!req.body.email) missingFields.push("email");
  if (!req.body.specialization) missingFields.push("specialization");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }
  try {
    const professor = await ProfessorService.createProfessor(req.body);
    res.status(201).json({ professor });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProfessorSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    let { specialization } = req.body;
    if (!specialization) {
      return res.status(400).json({ message: "Specialization is required." });
    }
    const validSpecializations = Object.values(Specialization);
    if (!validSpecializations.includes(specialization)) {
      return res.status(400).json({
        message: `Invalid specialization. Valid options are: ${validSpecializations.join(
          ", "
        )}`,
      });
    }
    const updatedProfessor =
      await ProfessorService.updateProfessorSpecialization(id, specialization);

    if (!updatedProfessor) {
      return res
        .status(404)
        .json({ message: `Professor with ID ${id} not found.` });
    }

    res.status(200).json(updatedProfessor);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

const deleteProfessor = async (req, res) => {
  try {
    const { id } = req.params;
    await ProfessorService.deleteProfessor(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfessorByPersonID = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await ProfessorService.getProfessorByPersonID(id);
    if (!professor) {
      return res.status(404).json({ message: "Professor not found" });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentsEnrolled = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const students = await ProfessorService.getEnrolledStudents(id);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignCourseToProfessor = async (req, res) => {
  try {
    const { id, courseID } = req.params;
    await ProfessorService.assignCourseToProfessor(id, courseID);
    res
      .status(200)
      .json({ message: "Course assigned to professor successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const Specialization = {
  COMPUTER_SCIENCE: "Computer Science",
  MATHEMATICS: "Mathematics",
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  BIOLOGY: "Biology",
  ENGINEERING: "Engineering",
  ECONOMICS: "Economics",
  LITERATURE: "Literature",
  HISTORY: "History",
  PHILOSOPHY: "Philosophy",
};

module.exports = {
  createProfessor,
  updateProfessorSpecialization,
  deleteProfessor,
  getProfessorByPersonID,
  getStudentsEnrolled,
  assignCourseToProfessor,
};
