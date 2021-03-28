const config = require("config");
const express = require("express");

if (!config.get("jwtPrivateKey"))
  throw new Error("FATAL ERROR: No private key.");

if (!config.get("mongoRoute")) throw new Error("FATAL ERROR: No mongo route.");

const app = express();

require("./startup/exception")();
require("./startup/db")();
require("./startup/prod")(app);
require("./startup/routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Service started on port ${port}.`));
