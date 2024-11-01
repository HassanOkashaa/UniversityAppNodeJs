// services/professorService.js
const ProfessorRepository = require("../repository/professorRepository");
const PersonService = require("./personService"); // Assuming we have a person service

const Specialization = {
  COMPUTER_SCIENCE: "Computer Science",
  MATHEMATICS: "Mathematics",
  PHYSICS: "Physics",
  CHEMISTRY: "Chemistry",
  BIOLOGY: "Biology",
  ENGINEERING: "Engineering",
  ECONOMICS: "Economics",
  LITERATURE: "Literature",
  HISTORY: "History",
  PHILOSOPHY: "Philosophy",
};

const ProfessorService = {
  createProfessor: async (professorData) => {
    const {
      username,
      password,
      name,
      email,
      dateOfBirth,
      address,
      specialization,
    } = professorData;

    const existingPerson = await PersonService.getPersonByUsername(username);
    if (existingPerson) {
      throw new Error("Username already exists");
    }

    const newPersonID = await PersonService.createPerson({
      username,
      password,
      name,
      dateOfBirth,
      address,
    });

    const professorID = await ProfessorRepository.create({
      email,
      specialization,
      personID: newPersonID,
    });
    return professorID;
  },

  updateProfessorSpecialization: async (professorID, specialization) => {
    if (!Object.values(Specialization).includes(specialization)) {
      throw new Error("Invalid specialization");
    }
    return await ProfessorRepository.updateSpecialization(
      professorID,
      specialization
    );
  },

  deleteProfessor: async (personID) => {
    await ProfessorRepository.deleteProfessorByID(personID);
  },

  getProfessorByPersonID: async (personID) => {
    return await ProfessorRepository.getProfessorByPersonID(personID);
  },

  getEnrolledStudents: async (professorID) => {
    return await ProfessorRepository.getEnrolledStudentsByProfessorID(
      professorID
    );
  },

  assignCourseToProfessor: async (professorID, courseID) => {
    await ProfessorRepository.assignCourseToProfessor(professorID, courseID);
  },
};

module.exports = ProfessorService;
