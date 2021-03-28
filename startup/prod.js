const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const express = require("express");

module.exports = function (app) {
  app.enable("trust proxy");
  // TODO: Setup Cors
  //   app.use('cors');
  app.use(helmet());
  app.use(compression());
  app.use(morgan("short"));
  app.use(express.json());
};
