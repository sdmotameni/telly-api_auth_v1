const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");

module.exports = function (app) {
  app.enable("trust proxy");
  if (process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
      if (req.header("x-forwarded-proto") !== "https") {
        res.redirect(`https://${req.header("host")}${req.url}`);
      } else next();
    });
  }
  app.use(cors());
  app.options("*", cors());
  app.use(helmet());
  app.use(compression());
  app.use(morgan("short"));
  app.use(express.json());
};
