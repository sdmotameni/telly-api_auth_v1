const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/user");

module.exports = async function (req, res, next) {
  try {
    const token = req.header("x-auth-token");

    const decodedId = jwt.verify(token, config.get("jwtPrivateKey"));

    let user = await User.findById(decodedId);
    if (!user)
      return res.status(404).send("No account found for your ID. Logout.");

    req.user = user;
    next();
  } catch (_) {
    return res.status(401).send("You are not authenticated. Login.");
  }
};
