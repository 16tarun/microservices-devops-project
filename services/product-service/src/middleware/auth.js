const jwt = require("jsonwebtoken");

const config = require("../config/config");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    req.user = jwt.verify(token, config.jwtSecret);

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = auth;
