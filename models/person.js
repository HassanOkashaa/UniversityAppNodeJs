const pool = require("../config/db");

const Person = {
  create: async (person) => {
    const { username, password, name, dateOfBirth, address } = person;
    const query = `
      INSERT INTO Person (username, password, name, dateOfBirth, address)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [username, password, name, dateOfBirth, address];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  findByUsername: async (username) => {
    const query = "SELECT * FROM Person WHERE username = $1";
    const result = await pool.query(query, [username]);
    return result.rows[0];
  },
};

module.exports = Person;
