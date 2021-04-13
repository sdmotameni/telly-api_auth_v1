// ENDPOINT: /profile
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const vCard = require("vcards-js");
const path = require("path");
const fs = require("fs");
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

router.get("/:id/vcard", async (req, res) => {
  let user = await User.findOne({ profileId: req.params.id });
  if (!user) return res.status(404).send("No profile found at that ID.");

  let name = user.name;
  const formattedName = name && name.trim().split(" ");

  let card = vCard();

  card.firstName = formattedName && formattedName[0];
  card.lastName = formattedName && formattedName[1];
  card.organization = user.bio;
  card.workPhone = user.phone;
  card.url = `https://app.gettelly.com/${user.profileId}`;
  card.note = "Save this contact!";

  card.saveToFile(`./cards/${user.profileId}.vcf`);
  var filePath = path.join(__dirname, `../cards/${user.profileId}.vcf`);

  res.sendFile(filePath, function () {
    fs.unlink(filePath, function (err) {
      if (err) console.error(err);
    });
  });
});

module.exports = router;
