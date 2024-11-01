const pool = require("../config/db");

const AdminRepository = {
  create: async (personID) => {
    const query = `
        INSERT INTO Admin (personid)
        VALUES ($1)
        RETURNING id;
      `;
    const result = await pool.query(query, [personID]);
    return result.rows[0].id;
  },
  getByPersonID: async (personID) => {
    const query = `SELECT * FROM Admin WHERE personid = $1;`;
    const result = await pool.query(query, [personID]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = AdminRepository;
