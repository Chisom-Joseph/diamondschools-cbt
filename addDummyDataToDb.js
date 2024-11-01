const { Level } = require("./models");

const levels = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

module.exports = async (req, res, next) => {
  // Add levels
  const levelsFromDb = await Level.findAll();
  if (levelsFromDb.length <= 0)
    levels.forEach((name) => {
      Level.create({ name });
    });

  next();
};
