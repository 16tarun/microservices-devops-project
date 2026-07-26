require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

const logger = require("./utils/logger");

app.listen(PORT, () => {
  logger.info(`User Service started on port ${PORT}`);
});