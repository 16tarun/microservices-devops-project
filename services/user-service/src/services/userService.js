const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logger = require("../utils/logger");
const userRepository = require("../repositories/userRepository");
const config = require("../config/config");

// ==========================
// Register User
// ==========================
const register = async (body) => {
  const { name, email, password } = body;

  // Check existing user
  const existingUser = await userRepository.findByEmail(email);

  if (existingUser) {
    logger.warn(`Registration failed. Email already exists: ${email}`);
    throw new Error("Email already exists");
  }

  // Hash Password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save User
  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  logger.info(`New user registered: ${user.email}`);

  return {
    message: "User Registered Successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

// ==========================
// Login User
// ==========================
const login = async (body) => {
  const { email, password } = body;

  const user = await userRepository.findByEmail(email);

  if (!user) {
    logger.warn(`Login failed. User not found: ${email}`);
    throw new Error("Invalid Credentials");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    logger.warn(`Login failed. Wrong password: ${email}`);
    throw new Error("Invalid Credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.jwtSecret,
    {
      expiresIn: "1h",
    },
  );

  logger.info(`User logged in: ${email}`);

  return {
    message: "Login Successful",
    token,
  };
};

module.exports = {
  register,
  login,
};
