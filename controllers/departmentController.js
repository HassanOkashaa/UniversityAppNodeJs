const DepartmentService = require("../services/departmentService");

const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res
        .status(400)
        .json({ message: "Department name is required and must be a string." });
    }
    const departmentId = await DepartmentService.createDepartment(name);
    console.log(departmentId);

    res.status(201).json({ department_id: departmentId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create department" });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const departmentId = parseInt(id, 10);
    if (isNaN(departmentId) || departmentId <= 0) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const department = await DepartmentService.getDepartmentById(departmentId);

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch department" });
  }
};

module.exports = {
  createDepartment,
  getDepartmentById,
};
