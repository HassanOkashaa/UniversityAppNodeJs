const CourseService = require("../services/courseService");
const EnrollmentService = require("../services/enrollmentService");
const StudentService = require("../services/studentService");

const enrollStudent = async (req, res) => {
  let { id, courseID } = req.params;
  id = parseInt(id);
  courseID = parseInt(courseID);
  console.log(id, courseID);
  try {
    if (!id || isNaN(Number(id)) || !Number.isInteger(Number(id))) {
      return res.status(400).json({
        message: "Student ID is required and must be a valid integer.",
      });
    }

    if (
      !courseID ||
      isNaN(Number(courseID)) ||
      !Number.isInteger(Number(courseID))
    ) {
      return res.status(400).json({
        message: "Course ID is required and must be a valid integer.",
      });
    }

    const student = await StudentService.getStudentByID(id);
    console.log(student);
    if (!student) {
      return res
        .status(404)
        .json({ message: `Student with ID ${id} not found.` });
    }
    const course = await CourseService.getCourseByID(courseID);
    console.log(course);
    if (!course) {
      return res
        .status(404)
        .json({ message: `Course with ID ${id} not found.` });
    }

    await EnrollmentService.enrollStudentInCourse(id, courseID);

    res.status(201).json({ message: "Student enrolled successfully" });
  } catch (error) {
    if (error.message === "Student not found") {
      return res.status(404).json({ message: error.message });
    } else if (error.message === "Student is already enrolled in the course") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Failed to enroll student" });
    }
  }
};

module.exports = {
  enrollStudent,
};
