// https://www.npmjs.com/package/express-async-errors

module.exports = function (err, _, res, _) {
  console.log(err.message, err);
  res.status(500).send("500: Server error. Try again later.");
};
