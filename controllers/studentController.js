const StudentService = require("../services/studentService");

const createStudent = async (req, res) => {
  try {
    const { username, password, name, dateOfBirth, address } = req.body;
    const missingFields = [];

    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    if (!name) missingFields.push("name");
    if (!address) missingFields.push("address");
    if (!dateOfBirth) missingFields.push("dateOfBirth");
    const errors = [];
    if (typeof username !== "string") errors.push("Username must be a string.");
    if (typeof password !== "string") errors.push("Password must be a string.");
    if (typeof address !== "string") errors.push("Address must be a string.");
    if (typeof dateOfBirth !== "string")
      errors.push("Date of Birth must be a string in ISO format.");
    if (typeof name !== "string") errors.push("Name must be a string.");

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }
    const student = await StudentService.createStudent(req.body);

    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const { enrolled } = req.query;

    if (enrolled === "false") {
      const students = await StudentService.getStudentsNotEnrolledInCourses();
      return res.status(200).json(students);
    }
    const students = await StudentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve students" });
  }
};
const getStudentsNotEnrolledInCourses = async (req, res) => {
  try {
    const students = await StudentService.getStudentsNotEnrolledInCourses();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve students" });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentsNotEnrolledInCourses,
};
