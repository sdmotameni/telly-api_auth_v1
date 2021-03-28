const Joi = require("@hapi/joi");

module.exports.validateReg = function (user) {
  const schema = Joi.object({
    profileId: Joi.string().max(100).required(),
    name: Joi.string().min(1).max(30).required(),
    email: Joi.string().min(1).max(30).required(),
    password: Joi.string().min(1).max(25).required(),
    phone: Joi.string().length(10).required(),
  });
  return schema.validate(user);
};

module.exports.validateUserUpdate = function (user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(30),
    name: Joi.string().min(1).max(30),
    password: Joi.string().min(1).max(25),
    phone: Joi.string().length(10),
    bio: Joi.string().max(30),
  });
  return schema.validate(user);
};

module.exports.validateLinksUpdate = function (links) {
  const schema = Joi.array().max(100).required();
  return schema.validate(links);
};

module.exports.validateLoginReq = function (user) {
  const schema = Joi.object({
    email: Joi.string().min(1).max(30).required(),
    password: Joi.string().min(1).max(25).required(),
  });
  return schema.validate(user);
};
