// ENDPOINT: /profile
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");

router.get("/:id", async (req, res) => {
  let user = await User.findOne({ profileId: req.params.id });
  if (!user) return res.status(404).send("No profile found at that ID.");

  user = _.pick(user, [
    "photoUrl",
    "phone",
    "profileId",
    "name",
    "bio",
    "links",
  ]);

  res.send(user);
});

module.exports = router;
