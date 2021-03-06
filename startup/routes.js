const user = require("../routes/user");
const profile = require("../routes/profile");
const register = require("../routes/register");
const admin = require("../routes/admin");
const login = require("../routes/login");
const auth = require("../middleware/auth");
const asyncErrors = require("../middleware/asyncErrors");

module.exports = function (app) {
  app.use("/profile", profile);
  app.use("/login", login);
  app.use("/register", register);
  app.use("/admin", auth, admin);
  app.use("/user", auth, user);
  app.use(asyncErrors);
};
