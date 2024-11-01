const pool = require("../config/db");

const CourseRepository = {
  create: async (courseData) => {
    const query = `INSERT INTO Course (name, credits, departmentID) VALUES ($1, $2, $3) RETURNING id`;
    const values = [
      courseData.name,
      courseData.credits,
      courseData.departmentID,
    ];

    const result = await pool.query(query, values);

    return result.rows[0].id;
  },
};

module.exports = CourseRepository;
