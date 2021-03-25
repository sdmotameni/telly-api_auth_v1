const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, _, next) {
  const token = req.header("x-auth-token");
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
  } catch (ex) {
    req.user = undefined;
  } finally {
    next();
  }
};
