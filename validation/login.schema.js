const Joi = require("joi");

module.exports = Joi.object({
  registrationNumber: Joi.string()
    .min(3)
    .max(32)
    .required()
    .label("Registration Number"),
});
