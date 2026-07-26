const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/users", userRoutes);

app.use(errorHandler);
app.get("/", (req, res) => {
  res.json({
    service: "User Service",
    status: "Running",
    version: "1.0.0",
  });
});

module.exports = app;
