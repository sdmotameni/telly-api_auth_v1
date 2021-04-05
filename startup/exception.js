const errorLogger = require("../utils/errorLogger");

module.exports = function () {
  // uncaughtException (sync errors)
  process.on("uncaughtException", (ex) => {
    errorLogger.log(ex);
    console.error("uncaughtException, terminating service...");
    console.error(ex);
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });

  // unhandledRej (async errors)
  process.on("unhandledRejection", (ex) => {
    errorLogger.log(ex);
    console.error("unhandledRej, terminating service...");
    console.error(ex);
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });
};
