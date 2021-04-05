// ENDPOINT: /user
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const fs = require("fs");
const { User } = require("../models/user");
const {
  validateUserUpdate,
  validateLinksUpdate,
} = require("../utils/validation");
const { handlePassword } = require("../utils/handlePassword");
const { trimObject } = require("../utils/trimObject");

const multer = require("multer");
const upload = multer({
  dest: "uploads",
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error("Please upload an image."));
    }
    cb(undefined, true);
  },
});

router.get("/me", async (req, res) => {
  let user = req.user;
  user = _.pick(user, ["phone", "profileId", "name", "bio", "links", "email"]);
  res.send(user);
});

router.post("/upload", upload.single("image"), async (req, res) => {
  let user = req.user;

  const img = {
    data: fs.readFileSync("uploads/" + req.file.filename),
    contentType: "image/png",
  };

  user.img = img;

  user
    .save()
    .then(() => res.send("Uploaded Successfully"))
    .catch(() => res.status(400).send("Upload failed."));
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
