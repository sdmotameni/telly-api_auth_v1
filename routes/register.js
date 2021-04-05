// ENDPOINT: /register
const express = require("express");
const router = express.Router();
const { User } = require("../models/user");
const { validateReg } = require("../utils/validation");
const { genDate } = require("../utils/genDate");
const { handlePassword } = require("../utils/handlePassword");
const { trimObject } = require("../utils/trimObject");

router.post("/", async (req, res) => {
  req.body = trimObject(req.body);

  const { error } = validateReg(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password: plainPassword, name, phone, profileId } = req.body;

  let user = await User.findOne({ email });
  if (user) return res.status(400).send("User already exists with that email.");

  if (await User.findOne({ profileId }))
    return res.status(400).send("ProfileID already exists.");

  const password = await handlePassword(plainPassword);

  const dateCreated = genDate();

  user = new User({ profileId, email, password, name, phone, dateCreated });

  await user.save();
  const token = user.genAuthToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send("Account created.");
});

module.exports = router;
