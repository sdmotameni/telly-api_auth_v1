module.exports = function () {
  // uncaughtException (sync errors)
  process.on("uncaughtException", (ex) => {
    console.error("uncaughtException, terminating service...");
    console.log(ex);
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });

  // unhandledRej (async errors)
  process.on("unhandledRejection", (ex) => {
    console.error("unhandledRej, terminating service...");
    console.log(ex);
    setTimeout(() => {
      process.exit(1);
    }, 2000);
  });
};
