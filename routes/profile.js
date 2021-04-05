// ENDPOINT: /profile
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { User } = require("../models/user");

router.get("/:id", async (req, res) => {
  let user = await User.findOne({ profileId: req.params.id });
  if (!user) return res.status(404).send("No profile found at that ID.");

  user = _.pick(user, ["phone", "profileId", "name", "bio", "links"]);

  res.send(user);
});

router.get("/:id/image", async (req, res) => {
  const user = await User.findOne({ profileId: req.params.id });

  try {
    if (!user || !user.img.data) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(user.img.data);
  } catch (e) {
    res.status(404).send(`No image found for: ${req.params.id}`);
  }
});

module.exports = router;
