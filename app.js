const express = require("express");
const professorRoutes = require("./routes/professorRoutes");
const studentRoutes = require("./routes/studentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/professors", professorRoutes);
app.use("/students", studentRoutes);
app.use("/departments", departmentRoutes);
app.use("/courses", courseRoutes);
app.use("/login", authRoutes);
app.use("/", (req, res) => {
  return res.json({ Status: "Good" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
