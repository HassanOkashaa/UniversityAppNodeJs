const Person = require("../models/person");

const personController = {
  createPerson: async (req, res) => {
    try {
      const newPerson = await Person.create(req.body);
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getPersonByUsername: async (req, res) => {
    try {
      const person = await Person.findByUsername(req.params.username);
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      res.json(person);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = personController;
