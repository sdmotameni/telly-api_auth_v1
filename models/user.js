const config = require("config");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  phone: { type: String },
  email: { type: String },
  password: { type: String },
  profileId: { type: String },
  dateCreated: { type: String },
  name: { type: String },
  bio: { type: String },
  links: { type: Object },
});

userSchema.methods.genAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    config.get("jwtPrivateKey")
  );

  return token;
};

const User = mongoose.model("User", userSchema);

exports.User = User;
