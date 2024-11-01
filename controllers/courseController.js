const CourseService = require("../services/courseService");
const DepartmentService = require("../services/departmentService");

const createCourse = async (req, res) => {
  try {
    const { name, credits } = req.body;
    const { id } = req.params;
    const department_id = parseInt(id);
    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Course name is required and must be a string." });
    }

    if (
      !credits ||
      typeof credits !== "number" ||
      isNaN(credits) ||
      credits <= 0
    ) {
      return res
        .status(400)
        .json({ message: "Credits must be a positive number." });
    }

    if (!department_id || !Number.isInteger(department_id)) {
      return res
        .status(400)
        .json({ message: "Department ID is required and must be an integer." });
    }

    const department = await DepartmentService.getDepartmentById(department_id);
    if (!department) {
      return res
        .status(404)
        .json({ message: `Department with ID ${department_id} not found.` });
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
