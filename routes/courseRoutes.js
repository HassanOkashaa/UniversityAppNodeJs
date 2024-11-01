const express = require("express");
const courseController = require("../controllers/courseController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware(["Admin"]), courseController.createCourse);

module.exports = router;
