const { Subject, Question, Option, Class } = require("../models");

module.exports = async (ClassId) => {
  try {
    const subjects = [];
    const examSettings = await require("../helpers/getExamSettings")();
    console.log(examSettings);

    if (!ClassId) return subjects;

    const subjectsFromDb = await Subject.findAll({
      include: {
        model: Class,
        where: { id: ClassId },
        through: { attributes: [] },
      },
    });

    console.log(subjectsFromDb);

    if (subjectsFromDb.length > 0) {
      await Promise.all(
        subjectsFromDb.map(async (subject) => {
          // Check if questions are available for subject
          const questionCount = await Question.count({
            where: { SubjectId: subject.dataValues.id },
          });
          if (questionCount <= 0) subject.dataValues.active = false;
          if (questionCount < examSettings.questionLimit)
            subject.dataValues.active = false;

          // Check if options are available for questions
          const optionsCount = await Option.count({
            include: [
              {
                model: Question,
                where: { SubjectId: subject.dataValues.id },
              },
            ],
          });

          console.log(`Options Count: ${optionsCount}`);
          if (optionsCount <= 0) subject.dataValues.active = false;

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
