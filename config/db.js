const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER || "hassan",
  host:
    process.env.DB_HOST ||
    "universitynodeapp.c9iaqc08yess.us-east-1.rds.amazonaws.com",
  database: process.env.DB_NAME || "universitynodeapp",
  password: process.env.DB_PASSWORD || "postgres",
  port: process.env.DB_PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err) => {
  if (err) {
    console.error("Connection error", err.stack);
  } else {
    console.log("Connected to RDS");
  }
});
