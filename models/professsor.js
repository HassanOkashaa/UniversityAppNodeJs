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

class Professor {
  constructor(id, email, person, specialization) {
    this.id = id;
    this.email = email;
    this.person = person;
    this.specialization = specialization;
  }
}

class ProfessorResponse {
  constructor(id, email, specialization, username, name, dateOfBirth, address) {
    this.id = id;
    this.email = email;
    this.specialization = specialization;
    this.username = username;
    this.name = name;
    this.dateOfBirth = dateOfBirth;
    this.address = address;
  }
}

module.exports = { Professor, ProfessorResponse, Specialization };
