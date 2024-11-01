const DepartmentRepository = require("../repository/departmentRepository");

const DepartmentService = {
  createDepartment: async (departmentData) => {
    return await DepartmentRepository.create(departmentData);
  },

  getDepartmentById: async (departmentId) => {
    return await DepartmentRepository.getById(departmentId);
  },
};

module.exports = DepartmentService;
