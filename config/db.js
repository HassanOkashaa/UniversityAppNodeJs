const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "hassan",
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || "universitynodeapp",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to RDS");
  }
});

module.exports = pool;
