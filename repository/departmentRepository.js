const pool = require("../config/db");

const DepartmentRepository = {
  create: async (departmentData) => {
    const query = `INSERT INTO Department (name) VALUES ($1) RETURNING id`;
    const values = [departmentData.name];

    const result = await pool.query(query, values);

    return result.rows[0].id;
  },

  getById: async (departmentId) => {
    const query = `SELECT * FROM Department WHERE id = $1`;
    const result = await pool.query(query, [departmentId]);

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  },
};

module.exports = DepartmentRepository;
