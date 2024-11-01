const CourseService = require("../services/courseService");
const ProfessorService = require("../services/professorService");

const createProfessor = async (req, res) => {
  const {
    username,
    password,
    name,
    dateOfBirth,
    email,
    specialization,
    address,
  } = req.body;
  const missingFields = [];

  if (!username) missingFields.push("username");
  if (!password) missingFields.push("password");
  if (!name) missingFields.push("name");
  if (!email) missingFields.push("email");
  if (!specialization) missingFields.push("specialization");
  if (!address) missingFields.push("address");
  if (!dateOfBirth) missingFields.push("dateOfBirth");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const errors = [];
  if (typeof username !== "string") errors.push("Username must be a string.");
  if (typeof password !== "string") errors.push("Password must be a string.");
  if (typeof address !== "string") errors.push("Address must be a string.");
  if (typeof dateOfBirth !== "string")
    errors.push("Date of Birth must be a string in ISO format.");
  if (typeof name !== "string") errors.push("Name must be a string.");
  if (
    typeof email !== "string" ||
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
  ) {
    errors.push("Email must be a valid email address.");
  }
  if (typeof specialization !== "string")
    errors.push("Specialization must be a string.");

  const validSpecializations = Object.values(Specialization);
  if (!validSpecializations.includes(specialization)) {
    return res.status(404).json({
      message: `Specialization not found. Available options are: ${validSpecializations.join(
        ", "
      )}`,
    });
  }
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join(" ") });
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
    const { specialization } = req.body;

    if (!id || isNaN(parseInt(id))) {
      return res
        .status(400)
        .json({ message: "Professor ID is required and must be an integer." });
    }

    if (!specialization || typeof specialization !== "string") {
      return res
        .status(400)
        .json({ message: "Specialization is required and must be a string." });
    }

    const validSpecializations = Object.values(Specialization);
    if (!validSpecializations.includes(specialization)) {
      return res.status(400).json({
        message: `Invalid specialization. Valid options are: ${validSpecializations.join(
          ", "
        )}`,
      });
    }
    const professor = await ProfessorService.getProfessorByID(id);
    if (!professor) {
      return res
        .status(404)
        .json({ message: `Professor with ID ${id} not found.` });
    }
    const updatedProfessor =
      await ProfessorService.updateProfessorSpecialization(
        parseInt(id),
        specialization
      );

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
    if (!id || isNaN(parseInt(id))) {
      return res
        .status(400)
        .json({ message: "Professor ID is required and must be an integer." });
    }

    await ProfessorService.deleteProfessor(parseInt(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProfessorByID = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res
        .status(400)
        .json({ message: "Professor ID is required and must be an integer." });
    }

    const professor = await ProfessorService.getProfessorByID(parseInt(id));
    if (!professor) {
      return res
        .status(404)
        .json({ message: `Professor with ID: ${id} not found` });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStudentsEnrolled = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
      return res
        .status(400)
        .json({ message: "Professor ID is required and must be an integer." });
    }

    const professor = await ProfessorService.getProfessorByID(id);
    if (!professor) {
      return res
        .status(404)
        .json({ message: `Professor with ID ${id} not found.` });
    }

    const students = await ProfessorService.getEnrolledStudents(parseInt(id));
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const assignCourseToProfessor = async (req, res) => {
  try {
    const { id, courseID } = req.params;

    if (!id || isNaN(parseInt(id))) {
      return res
        .status(400)
        .json({ message: "Professor ID is required and must be an integer." });
    }
    if (!courseID || isNaN(parseInt(courseID))) {
      return res
        .status(400)
        .json({ message: "Course ID is required and must be an integer." });
    }

    const professor = await ProfessorService.getProfessorByID(id);
    if (!professor) {
      return res
        .status(404)
        .json({ message: `Professor with ID ${id} not found.` });
    }
    const course = await CourseService.getCourseByID(courseID);
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with ID ${id} not found.` });
    }

    await ProfessorService.assignCourseToProfessor(
      parseInt(id),
      parseInt(courseID)
    );
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
  getProfessorByID,
  getStudentsEnrolled,
  assignCourseToProfessor,
};
