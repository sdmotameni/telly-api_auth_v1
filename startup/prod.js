const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const cors = require("cors");

module.exports = function (app) {
  app.enable("trust proxy");
  app.use(cors());
  app.options("*", cors());
  app.use(helmet());
  app.use(compression());
  app.use(morgan("short"));
  app.use(express.json());
};
