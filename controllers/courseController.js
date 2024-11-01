const CourseService = require("../services/courseService");

const createCourse = async (req, res) => {
  try {
    const { name, credits, department_id } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Course name is required." });
    }

    if (!credits || isNaN(credits) || credits <= 0) {
      return res
        .status(400)
        .json({ message: "Credits must be a positive number." });
    }
    if (!department_id) {
      return res.status(400).json({ message: "Department ID is required." });
    }

    const courseId = await CourseService.createCourse({
      name,
      credits,
      departmentID: department_id,
    });

    res.status(201).json({ course_id: courseId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create course" });
  }
};

module.exports = {
  createCourse,
};
