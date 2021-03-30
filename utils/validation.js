const Joi = require("@hapi/joi");

module.exports.validateReg = function (user) {
  const schema = Joi.object({
    profileId: Joi.string().max(100).required().label("Profile ID"),
    name: Joi.string().min(1).max(30).required().label("Name"),
    email: Joi.string().min(1).max(30).required().label("Email"),
    password: Joi.string().min(1).max(25).required().label("Password"),
    phone: Joi.string().length(10).required().label("Phone Number"),
  });
  return schema.validate(user);
};

module.exports.validateUserUpdate = function (user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(30).label("Email"),
    name: Joi.string().min(1).max(30).label("Name"),
    password: Joi.string().min(1).max(25).label("Password"),
    phone: Joi.string().length(10).label("Phone Number"),
    bio: Joi.string().max(30).label("Bio"),
  });
  return schema.validate(user);
};

module.exports.validateLinksUpdate = function (links) {
  const schema = Joi.object().max(50).required();
  return schema.validate(links);
};

module.exports.validateLoginReq = function (user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(30).required().label("Email"),
    password: Joi.string().min(1).max(25).required().label("Password"),
  });
  return schema.validate(user);
};
