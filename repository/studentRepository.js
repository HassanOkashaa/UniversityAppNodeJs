const pool = require("../config/db");

const StudentRepository = {
  create: async (student) => {
    const { personID, gpa } = student;
    const query = `
      INSERT INTO Student (personID, gpa)
      VALUES ($1, $2)
      RETURNING id;
    `;
    const result = await pool.query(query, [personID, gpa]);
    return result.rows[0].id;
  },

  getAll: async () => {
    const query = `
      SELECT s.id, p.username, p.name, p.dateOfBirth, p.address, s.gpa
      FROM Student s
      JOIN Person p ON s.personID = p.id;
    `;
    const result = await pool.query(query);
    return result.rows;
  },

  getStudentsNotEnrolledInCourses: async () => {
    const query = `
      SELECT s.id, p.username, p.name, p.dateOfBirth, p.address, s.gpa
      FROM Student s
      JOIN Person p ON s.personID = p.id
      WHERE s.id NOT IN (
        SELECT studentID FROM Enrollment
      );
    `;
    const result = await pool.query(query);
    return result.rows;
  },
  getByPersonID: async (personID) => {
    const query = `SELECT * FROM Student WHERE personID = $1;`;
    const result = await pool.query(query, [personID]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
  getByID: async (id) => {
    console.log("HERE");
    const query = `SELECT * FROM Student WHERE id = $1;`;
    const result = await pool.query(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = StudentRepository;
