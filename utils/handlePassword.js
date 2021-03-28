const bcrypt = require("bcrypt");

module.exports.handlePassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};
