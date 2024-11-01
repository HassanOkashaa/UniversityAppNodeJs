const AdminRepository = require("../repository/adminRepository");
const PersonService = require("./personService");

const AdminService = {
  createAdmin: async (data) => {
    const { username, password, name, dateOfBirth, address } = data;

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
    console.log(personID);

    const adminID = await AdminRepository.create(personID);

    return {
      adminID: adminID,
      userID: personID,
      username,
      name,
      dateOfBirth,
      address,
    };
  },
};

module.exports = AdminService;
