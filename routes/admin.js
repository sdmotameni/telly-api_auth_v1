const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");

router.get("/", async (req, res) => {
  if (req.user.email !== "me@sepmotameni.com")
    return res.status(401).send("Unauthorized access.");

  let users = await User.find();

  users = users.map((user) =>
    _.pick(user, [
      "profileId",
      "email",
      "name",
      "phone",
      "dateCreated",
      "bio",
      "photoUrl",
      "links",
    ])
  );

  res.send(users);
});

router.get("/:id", async (req, res) => {
  if (req.user.email !== "me@sepmotameni.com")
    return res.status(401).send("Unauthorized access.");

  let user = await User.findOne({ profileId: req.params.id });
  if (!user)
    return res.status(400).send("No user found with given profile ID.");

  user = _.pick(user, [
    "profileId",
    "email",
    "name",
    "phone",
    "dateCreated",
    "bio",
    "photoUrl",
    "links",
  ]);
  res.send(user);
});

module.exports = router;
