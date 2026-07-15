const { Subject, Question, Option, Class, Sequelize } = require("../models");
const { Op } = Sequelize;

module.exports = async ({ ClassId, For }) => {
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
      const subjectIds = subjectsFromDb.map(s => s.id);

      // Fetch all question counts for these subjects in a single query
      const questionCounts = await Question.findAll({
        attributes: [
          "SubjectId",
          [Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
        ],
        where: {
          SubjectId: { [Op.in]: subjectIds },
          ClassId,
          for: { [Op.or]: ["all", For] },
        },
        group: ["SubjectId"],
        raw: true,
      });

      const questionCountsMap = {};
      questionCounts.forEach(qc => {
        questionCountsMap[qc.SubjectId] = parseInt(qc.count) || 0;
      });

      // Fetch all option counts for these subjects in a single query
      const optionCounts = await Option.findAll({
        attributes: [
          [Sequelize.col("Question.SubjectId"), "SubjectId"],
          [Sequelize.fn("COUNT", Sequelize.col("Option.id")), "count"],
        ],
        include: [
          {
            model: Question,
            attributes: [],
            where: { SubjectId: { [Op.in]: subjectIds } },
          },
        ],
        group: ["Question.SubjectId"],
        raw: true,
      });

      const optionCountsMap = {};
      optionCounts.forEach(oc => {
        const sId = oc.SubjectId || oc["Question.SubjectId"];
        optionCountsMap[sId] = parseInt(oc.count) || 0;
      });

      // Map active state in memory
      for (const subject of subjectsFromDb) {
        const questionCount = questionCountsMap[subject.id] || 0;
        const optionsCount = optionCountsMap[subject.id] || 0;

        if (questionCount <= 0) subject.dataValues.active = false;
        if (questionCount < examSettings.questionLimit)
          subject.dataValues.active = false;
        if (optionsCount <= 0) subject.dataValues.active = false;

        subjects.push(subject.dataValues);
      }
    }

    return subjects.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.log(error);
    return [];
  }
};
