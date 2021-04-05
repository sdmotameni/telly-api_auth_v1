// ENDPOINT: /login
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../models/user");
const { validateLoginReq } = require("../utils/validation");
const { trimObject } = require("../utils/trimObject");

router.post("/", async (req, res) => {
  req.body = trimObject(req.body);

  const { error } = validateLoginReq(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.genAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send("Succesful login.");
});

module.exports = router;
