const { Question, Option, Sequelize } = require("../models");

module.exports = async (SubjectId) => {
  try {
    const quizQuestions = [];

    // Get questions with options
    const quizQuestionsFromDb = await Question.findAll({
      where: { SubjectId },
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

    // console.log(quizQuestions);
    console.log(quizQuestionsFromDb);
    console.log(quizQuestionsFromDb.length);

    // Shuffle questions
    // for (let i = quizQuestions.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    // }

    // Add correct options
    // quizQuestions = [
    //   ...quizQuestions,
    //   ...quizQuestions.map((question) => {
    //     return {
    //       ...question,
    //       correctOption: question.options.find((option) => option.correct).id
    //     }
    //   })
    // ]

    return quizQuestions;
  } catch (error) {
    console.log(error);
    return [];
  }
};
