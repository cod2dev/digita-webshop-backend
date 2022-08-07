require("express-async-errors");
const winston = require("winston");
const debug = require("debug")("app:start:logging");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    debug(ex);
    winston.error(ex.message, ex);
    process.exit(1);
  });

  winston.add(new winston.transports.File({ filename: "logFile.log" }));
};
