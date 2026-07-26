const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const validate = require("../middleware/validate");

const {
  registerSchema,

  loginSchema,
} = require("../validators/userValidator");

const {
  register,

  login,

  profile,
} = require("../controllers/userController");

router.post("/register", validate(registerSchema), register);

router.post("/login", validate(loginSchema), login);

router.get("/profile", auth, profile);

module.exports = router;
