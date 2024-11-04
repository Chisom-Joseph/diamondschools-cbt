const { Subject } = require("../models");

module.exports = async () => {
  try {
    const subjects = [];

    const subjectsFromDb = await Subject.findAll();

    if (subjectsFromDb.length > 0) {
      subjectsFromDb.forEach((subject) => {
        subject.dataValues.active && subjects.push(subject.dataValues);
      });
    }
    return subjects;
  } catch (error) {
    console.log(error);
    return [];
  }
};
