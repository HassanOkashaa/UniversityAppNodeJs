const AdminService = require("../services/adminService");

const createAdmin = async (req, res) => {
  try {
    const { username, password, name, dateOfBirth, address } = req.body;
    const missingFields = [];

    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    if (!name) missingFields.push("name");
    if (!address) missingFields.push("address");
    if (!dateOfBirth) missingFields.push("dateOfBirth");
    const errors = [];
    if (typeof username !== "string") errors.push("Username must be a string.");
    if (typeof password !== "string") errors.push("Password must be a string.");
    if (typeof address !== "string") errors.push("Address must be a string.");
    if (typeof dateOfBirth !== "string")
      errors.push("Date of Birth must be a string in ISO format.");
    if (typeof name !== "string") errors.push("Name must be a string.");

    if (errors.length > 0) {
      return res.status(400).json({ message: errors.join(" ") });
    }
    const admin = await AdminService.createAdmin(req.body);

    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAdmin,
};
