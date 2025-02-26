const { Question, Option, Class, Sequelize } = require("../models");
const { Op } = Sequelize;

module.exports = async ({ SubjectId, ClassId, For }) => {
  try {
    let quizQuestions = [];

    const examSettings = await require("../helpers/getExamSettings")();

    // Get questions with options
    const quizQuestionsFromDb = await Question.findAll({
      where: { SubjectId, ClassId, for: { [Op.or]: ["all", For] } },
      include: [
        {
          model: Option,
          attributes: ["id", "name", "correct"],
        },
      ],
    });

    quizQuestionsFromDb.forEach((question) => {
      quizQuestions.push({
        question: question.dataValues,
        options: question.Options.map((option) => option.dataValues),
      });
    });

    // Shuffle questions if enabled
    if (examSettings?.shuffleQuestions) {
      for (let i = quizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizQuestions[i], quizQuestions[j]] = [
          quizQuestions[j],
          quizQuestions[i],
        ];
      }
    }

    // Shuffle options if enabled
    if (examSettings?.shuffleOptions) {
      quizQuestions = quizQuestions.map((question) => {
        const shuffledOptions = [...question.options];

        for (let i = shuffledOptions.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledOptions[i], shuffledOptions[j]] = [
            shuffledOptions[j],
            shuffledOptions[i],
          ];
        }

        return {
          ...question,
          options: shuffledOptions,
          correctOption: shuffledOptions.find((option) => option.correct).id, // Maintain correct option
        };
      });
    }

    return quizQuestions;
  } catch (error) {
    console.error("ERROR GETTING QUIZ QUESTIONS");
    console.error(error);
    return [];
  }
};
