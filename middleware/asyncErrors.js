// https://www.npmjs.com/package/express-async-errors

const errorLogger = require("../utils/errorLogger");

module.exports = function (err, _, res, _) {
  console.error(err.message, err);
  errrorLogger.log(err);
  res.status(500).send("500: Server error. Try again later.");
};
