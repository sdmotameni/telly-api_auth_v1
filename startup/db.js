const config = require("config");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

module.exports = function () {
  mongoose
    .connect(config.get("mongoRoute"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB via Mongoose."));
};
