const { Level } = require("../models");

module.exports = async (id) => {
  try {
    const level = await Level.findOne({ id });
    return level ? level.dataValues : {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
