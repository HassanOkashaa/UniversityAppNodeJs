const pool = require("../config/db");

const PersonRepository = {
  create: async (person) => {
    const { username, password, name, dateOfBirth, address } = person;
    const query = `
      INSERT INTO Person (username, password, name, dateOfBirth, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id;
    `;
    const result = await pool.query(query, [
      username,
      password,
      name,
      dateOfBirth,
      address,
    ]);
    return result.rows[0].id;
  },

  getByUsername: async (username) => {
    const query = `SELECT * FROM Person WHERE username = $1;`;
    const result = await pool.query(query, [username]);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  },
};

module.exports = PersonRepository;
