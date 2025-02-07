const Joi = require("joi");

module.exports = Joi.object({
  examinationNumber: Joi.string()
    .min(3)
    .max(32)
    .required()
    .label("Examination Number"),
});
