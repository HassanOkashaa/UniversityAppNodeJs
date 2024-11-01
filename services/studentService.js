const bcrypt = require("bcrypt");
const StudentRepository = require("../repository/studentRepository");
const PersonService = require("./personService");

const StudentService = {
  createStudent: async (studentData) => {
    const { username, password, name, dateOfBirth, address, gpa } = studentData;

    const existingPerson = await PersonService.getPersonByUsername(username);
    if (existingPerson) {
      throw new Error("Username already exists");
    }

    const newPerson = {
      username,
      password: password,
      name,
      dateOfBirth,
      address,
    };

    const personID = await PersonService.createPerson(newPerson);

    const studentID = await StudentRepository.create({
      personID,
      gpa,
    });

    return {
      studentID: studentID,
      userID: personID,
      username,
      name,
      dateOfBirth,
      address,
      gpa,
    };
  },

  getAllStudents: async () => {
    return await StudentRepository.getAll();
  },

  getStudentsNotEnrolledInCourses: async () => {
    return await StudentRepository.getStudentsNotEnrolledInCourses();
  },
};

module.exports = StudentService;
