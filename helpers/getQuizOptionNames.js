const { OptionName } = require("../models");

module.exports = async () => {
  try {
    // const optionNames = [];

    // const optionNamesFromDb = await OptionName.findAll();

    // if (optionNamesFromDb.length <= 0) return [];

    // optionNamesFromDb.forEach((optionName) => {
    //   optionNames.push(optionName.dataValues);
    // });

    // return optionNames.sort((a, b) => a.name.localeCompare(b.name));
    ["A", "B", "C", "D"].sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.log(error);
    return [];
  }
};
