// ENDPOINT: /user
const express = require("express");
const router = express.Router();
const _ = require("lodash");

const { User } = require("../models/user");
const {
  validateUserUpdate,
  validateLinksUpdate,
} = require("../utils/validation");
const { handlePassword } = require("../utils/handlePassword");
const { trimObject } = require("../utils/trimObject");

router.get("/me", async (req, res) => {
  let user = req.user;
  user = _.pick(user, [
    "photoUrl",
    "phone",
    "profileId",
    "name",
    "bio",
    "links",
    "email",
  ]);
  res.send(user);
});

//TODO: Remove:
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dyusynvjw",
  api_key: "652182949657319",
  api_secret: "wJ-A-O6zIEsB8Y5wWYK4xt-fD48",
});

router.post("/upload", async (req, res) => {
  // cloudinary.v2.uploader.upload(
  //   "/Users/sepmotameni/Desktop/photo-api/food.png",
  //   function (error, result) {
  //     console.log(result, error);
  //   }
  // );
  res.send(req);
});

router.post("/settings", async (req, res) => {
  req.body = trimObject(req.body);
  let user = req.user;

  const { error } = validateUserUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  if (req.body.email && req.body.email != user.email) {
    let emailCheck = await User.findOne({ email: req.body.email });
    if (emailCheck)
      return res.status(400).send("User already exists with that email.");
  }

  if (req.body.password) {
    user.password = await handlePassword(req.body.password);
    delete req.body.password;
  }

  Object.keys(req.body).forEach(async (ele) => {
    user[ele] = req.body[ele];
  });

  await user.save();
  res.send("Updated settings.");
});

router.post("/links", async (req, res) => {
  req.body = trimObject(req.body);
  let user = req.user;

  const { error } = validateLinksUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  user.links = req.body;

  await user.save();
  res.send("Updated links.");
});

module.exports = router;
