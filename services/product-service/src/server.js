require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5001;

const logger = require("./utils/logger");

app.listen(PORT, () => {
  logger.info(`Product Service started on port ${PORT}`);
});
