const AuthService = require("../services/authService");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await AuthService.login(username, password);

    res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  login,
};
