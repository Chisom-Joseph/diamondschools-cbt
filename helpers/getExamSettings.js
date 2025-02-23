const { ExamSettings } = require("../models");

module.exports = async () => {
  try {
    const examSettings = await ExamSettings.findOne({
      where: { uniqueKey: 1 },
    });
    if (!examSettings) return {};
    return examSettings;
  } catch (error) {
    console.error("ERROR GETTING EXAM SETTINGS");
    console.error(error);
    return {};
  }
};
