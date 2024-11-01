// services/personService.js
const bcrypt = require("bcrypt");
const PersonRepository = require("../repository/personRepository");

const PersonService = {
  getPersonByUsername: async (username) => {
    return await PersonRepository.getByUsername(username);
  },

  createPerson: async (personData) => {
    const { username, password, name, dateOfBirth, address } = personData;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPerson = {
      username,
      password: hashedPassword,
      name,
      dateOfBirth,
      address,
    };

    const personID = await PersonRepository.create(newPerson);
    return personID;
  },
};

module.exports = PersonService;
