const { Level } = require("../models");

module.exports = async () => {
  try {
    const levels = await Level.findAll();
    return levels.length > 0
      ? levels.sort((a, b) => a.name.localeCompare(b.name))
      : [];
  } catch (error) {
    console.log("ERROR GETTING LEVELS");
    console.log(error);
    return [];
  }
};
