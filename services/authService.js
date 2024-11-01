const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const PersonRepository = require("../repository/personRepository");
const ProfessorRepository = require("../repository/professorRepository");
const StudentRepository = require("../repository/studentRepository");
const AdminRepository = require("../repository/adminRepository");

const jwtSecret = process.env.JWT_SECRET || "Lasting-Dynamics";

const AuthService = {
  login: async (username, password) => {
    const user = await PersonRepository.getByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    let userType = null;

    const isProfessor = await ProfessorRepository.getByPersonID(user.id);
    if (isProfessor) {
      userType = "Professor";
    }

    const isStudent = await StudentRepository.getByPersonID(user.id);
    if (isStudent) {
      userType = "Student";
    }
    const isAdmin = await AdminRepository.getByPersonID(user.id);
    if (isAdmin) {
      userType = "Admin";
    }

    if (!userType) {
      throw new Error("User type not recognized");
    }
    const token = jwt.sign(
      {
        username: user.username,
        userType: userType,
      },
      jwtSecret,
      { expiresIn: "24h" }
    );

    return token;
  },
};

module.exports = AuthService;
