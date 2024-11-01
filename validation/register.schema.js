const Joi = require("joi");

module.exports = Joi.object({
  username: Joi.string().min(3).max(32).required().label("Username"),
  firstName: Joi.string().min(3).max(32).required().label("First Name"),
  middleName: Joi.string().min(3).max(32).required().label("Middle Name"),
  lastName: Joi.string().min(3).max(32).required().label("Last Name"),
  registrationNumber: Joi.string()
    .min(3)
    .max(32)
    .required()
    .label("Registration Number"),
  password: Joi.string().min(6).max(1000).required().label("Password"),
  passwordConfirm: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .messages({ "any.only": "Passwords must match" }),
  level: Joi.string().max(1000).required().label("levle"),
});
