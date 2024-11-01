const StudentService = require("../services/studentService");

const createStudent = async (req, res) => {
  try {
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
