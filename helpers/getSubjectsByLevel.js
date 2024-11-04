const { Subject, Question } = require("../models");

module.exports = async (LevelId) => {
  try {
    const subjects = [];

    if (!LevelId) return subjects;

    const subjectsFromDb = await Subject.findAll({
      where: { LevelId },
    });

    if (subjectsFromDb.length > 0) {
      await Promise.all(
        subjectsFromDb.map(async (subject) => {
          // Check if questions are available for subject
          const questionCount = await Question.count({
            where: { SubjectId: subject.dataValues.id },
          });
          if (questionCount <= 0) subject.dataValues.active = false;

          console.log(subject.dataValues.active);
          // subject.dataValues.active && subjects.push(subject.dataValues);
          subjects.push(subject.dataValues);
        })
      );
    }

    return subjects.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.log(error);
    return [];
  }
};
