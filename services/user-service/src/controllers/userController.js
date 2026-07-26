const userService = require("../services/userService");

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const profile = (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  profile,
};
