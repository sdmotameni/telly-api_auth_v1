// ENDPOINT: /user
const express = require("express");
const router = express.Router();

const { User } = require("../models/user");
const {
  validateUserUpdate,
  validateLinksUpdate,
} = require("../utils/validation");
const { handlePassword } = require("../utils/handlePassword");

router.get("/me", async (req, res) => {
  if (!req._id)
    return res.status(401).send("You are not authenticated. Login.");

  let user = await User.findById(req._id).select(
    "-password -_id -dateCreated -__v -profileId"
  );
  if (!user)
    return res.status(404).send("No account found for your ID. Logout.");

  res.send(user);
});

router.post("/settings", async (req, res) => {
  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // ----------------------------------------------------------------
  // FIXME: Duplicate logic
  if (!req._id)
    return res.status(401).send("You are not authenticated. Login.");

  let user = await User.findById(req._id).select("-password");
  if (!user)
    return res.status(404).send("No account found for your ID. Logout.");
  // ----------------------------------------------------------------

  if (req.body.password) {
    user.password = await handlePassword(req.body.password);
    delete req.body.password;
  }

  Object.keys(req.body).forEach(async (ele) => {
    user[ele] = req.body[ele];
  });

  await user.save();
  res.send(user);
});

router.post("/links", async (req, res) => {
  const { error } = validateLinksUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // ----------------------------------------------------------------
  // FIXME: Duplicate logic
  if (!req._id)
    return res.status(401).send("You are not authenticated. Login.");

  let user = await User.findById(req._id).select("-password");
  if (!user)
    return res.status(404).send("No account found for your ID. Logout.");
  // ----------------------------------------------------------------

  user.links = req.body;

  await user.save();
  res.send(user);
});

module.exports = router;
