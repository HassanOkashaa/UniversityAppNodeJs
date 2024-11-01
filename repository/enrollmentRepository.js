const pool = require("../config/db");

const EnrollmentRepository = {
  enrollStudent: async (studentID, courseID) => {
    const query = `INSERT INTO Enrollment (studentID, courseID, dateEnrolled) VALUES ($1, $2, $3)`;
    const now = new Date();
    try {
      console.log(studentID, courseID, now);
      await pool.query(query, [studentID, courseID, now]);
    } catch (err) {
      console.error("Error enrolling student:", err);
      throw err;
    }
  },

  isStudentEnrolled: async (studentID, courseID) => {
    console.log("isStudentEnrolled function called with:", studentID, courseID);

    const query = `SELECT COUNT(*) FROM Enrollment WHERE studentID = $1 AND courseID = $2`;
    try {
      const result = await pool.query(query, [studentID, courseID]);

      console.log("Full query result:", result);

      if (result.rows.length === 0) {
        console.log("No rows returned");
        return false;
      }

      const count = parseInt(result.rows[0].count, 10);
      console.log("Enrollment count:", count);
      return count > 0;
    } catch (err) {
      console.error("Error checking student enrollment:", err);
      throw err;
    }
  },
};

module.exports = EnrollmentRepository;
