const EnrollmentService = require("../services/enrollmentService");

const enrollStudent = async (req, res) => {
  try {
    const { id, courseID } = req.params;
    if (!id || !courseID) {
      return res
        .status(400)
        .json({ message: "Student ID and Course ID are required" });
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
