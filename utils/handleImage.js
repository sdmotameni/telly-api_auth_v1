const config = require("config");
const fs = require("fs");
const cloudinary = require("cloudinary");
cloudinary.config(config.get("cloudinary"));

module.exports.handleImage = function (imagePath, user, res) {
  cloudinary.v2.uploader.upload(
    imagePath,
    { folder: "profile/", public_id: user.profileId },
    function (error, result) {
      if (error) return res.status(400).send("Upload failed.");

      user.photoUrl = cloudinary.url("profile/" + user.profileId, {
        width: 200,
        height: 200,
        gravity: "face",
        crop: "thumb",
        version: result.version,
      });

      user
        .save()
        .then(() => {
          fs.unlinkSync("./" + imagePath);
          return res.send("Upload successful.");
        })
        .catch(() => {
          return res.status(400).send("Upload failed.");
        });
    }
  );
};
