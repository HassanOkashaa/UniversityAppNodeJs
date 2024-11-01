const pool = require("../config/db");

const ProfessorRepository = {
  create: async (professor) => {
    const { email, specialization, personID } = professor;
    const emailCheckQuery = `
      SELECT id FROM Professor WHERE email = $1;
    `;
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    if (emailCheckResult.rows.length > 0) {
      throw new Error("A professor with this email already exists.");
    }

    const insertQuery = `
      INSERT INTO Professor (email, specialization, personID)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;
    const insertResult = await pool.query(insertQuery, [
      email,
      specialization,
      personID,
    ]);
    const professorId = insertResult.rows[0].id;

    const fullQuery = `
      SELECT 
        p.id as professorId,
        p.email,
        p.specialization,
        person.id as personId,
        person.username,
        person.name,
        person.dateOfBirth,
        person.address
      FROM Professor p
      JOIN Person person ON p.personID = person.id
      WHERE p.id = $1;
    `;
    const fullResult = await pool.query(fullQuery, [professorId]);
    return fullResult.rows[0];
  },

  getProfessorByPersonID: async (personID) => {
    const query = `
      SELECT pr.id, pr.specialization, p.id, p.username, p.name, p.dateOfBirth, p.address 
      FROM Professor pr
      JOIN Person p ON pr.personID = p.id
      WHERE pr.personID = $1;
    `;
    const result = await pool.query(query, [personID]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },

  getProfessorByID: async (professorID) => {
    const query = `
      SELECT pr.id as id, pr.specialization, p.id as userID, p.username, p.name, p.dateOfBirth, p.address 
      FROM Professor pr
      JOIN Person p ON pr.personID = p.id
      WHERE pr.id = $1;
    `;
    const result = await pool.query(query, [professorID]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },

  updateSpecialization: async (professorID, specialization) => {
    const updateQuery = `
      UPDATE Professor
      SET specialization = $1
      WHERE id = $2;
    `;
    await pool.query(updateQuery, [specialization, professorID]);

    const query = `
      SELECT pr.id, pr.email, pr.specialization, p.username, p.name, p.dateOfBirth, p.address 
      FROM Professor pr
      JOIN Person p ON pr.personID = p.id
      WHERE pr.id = $1;
    `;
    const result = await pool.query(query, [professorID]);
    return result.rows[0];
  },

  deleteProfessorByID: async (personID) => {
    await pool.query(`DELETE FROM Professor WHERE personID = $1;`, [personID]);
    await pool.query(`DELETE FROM Person WHERE id = $1;`, [personID]);
  },

  getEnrolledStudentsByProfessorID: async (professorID) => {
    try {
      const professorQuery = `SELECT id FROM Professor WHERE id = $1;`;
      const professorResult = await pool.query(professorQuery, [professorID]);

      if (professorResult.rowCount === 0) {
        throw new Error(`Professor with ID ${professorID} does not exist.`);
      }

      const query = `
        SELECT s.id, p.id AS personID, p.username, p.name, p.dateOfBirth, s.gpa, c.id AS courseID, c.name AS courseName
        FROM Professor_Course pc
        JOIN Course c ON pc.courseID = c.id
        JOIN Enrollment e ON e.courseID = c.id
        JOIN Student s ON e.studentID = s.id
        JOIN Person p ON s.personID = p.id
        WHERE pc.professorID = $1;    
      `;
      const result = await pool.query(query, [professorID]);
      if (result.rowCount === 0) {
        return [];
      }

      const students = {};
      result.rows.forEach((row) => {
        const studentID = row.id;
        if (!students[studentID]) {
          students[studentID] = {
            id: row.id,
            personID: row.personid,
            username: row.username,
            name: row.name,
            dateOfBirth: row.dateofbirth,
            gpa: row.gpa,
            courses: [],
          };
        }
        students[studentID].courses.push({
          id: row.courseid,
          name: row.coursename,
        });
      });

      return Object.values(students);
    } catch (error) {
      console.error(
        `Error fetching enrolled students for professor ${professorID}:`,
        error.message
      );
      throw error;
    }
  },

  assignCourseToProfessor: async (professorID, courseID) => {
    try {
      const professorQuery = `SELECT id FROM Professor WHERE id = $1;`;
      const professorResult = await pool.query(professorQuery, [professorID]);

      if (professorResult.rowCount === 0) {
        throw new Error(`Professor with ID ${professorID} does not exist.`);
      }
      const courseQuery = `SELECT id FROM Course WHERE id = $1;`;
      const courseResult = await pool.query(courseQuery, [courseID]);

      if (courseResult.rowCount === 0) {
        throw new Error(`Course with ID ${courseID} does not exist.`);
      }

      const assignQuery = `INSERT INTO Professor_Course (professorID, courseID) VALUES ($1, $2);`;
      await pool.query(assignQuery, [professorID, courseID]);

      console.log(
        `Course ${courseID} successfully assigned to Professor ${professorID}.`
      );
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  },

  getByPersonID: async (personID) => {
    const query = `SELECT * FROM Professor WHERE personID = $1;`;
    const result = await pool.query(query, [personID]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = ProfessorRepository;
