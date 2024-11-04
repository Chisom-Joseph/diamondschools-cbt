const { OptionNames } = require("../models");

module.exports = async () => {
  try {
    const optionNames = [];

    const optionNamesFromDb = await OptionNames.findAll();

    if (optionNamesFromDb.length <= 0) return [];

    optionNamesFromDb.forEach((optionName) => {
      optionNames.push(optionName.dataValues);
    });

    return optionNames.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.log(error);
    return [];
  }
};
