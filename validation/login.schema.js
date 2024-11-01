const Joi = require("joi");

module.exports = Joi.object({
  registrationNumber: Joi.string()
    .min(3)
    .max(32)
    .required()
    .label("Registration Number"),
  password: Joi.string().min(6).max(1000).required().label("Password"),
});
