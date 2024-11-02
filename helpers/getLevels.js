const { Level } = require("../models");

module.exports = async () => {
  try {
    const levels = await Level.findAll();
    return levels.length > 0 ? levels : [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
