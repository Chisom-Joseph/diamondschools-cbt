const quizQuestions = require("../helpers/getQuizQuestions")();

module.exports = (req, res) => {
  const userAnswers = req.body.answers;
  let correctCount = 0;

  //   Check if answer is correct
  userAnswers.forEach((userAnswer) => {
    // Get current question
    const currentQuestion = quizQuestions.find(
      (question) => question.id === userAnswer.questionId
    );

    // Check if answer is correct
    const correctOption = currentQuestion.options.find((option) => {
      return option.id === userAnswer.optionId && option.correct;
    });

    // Update correct count
    if (correctOption) {
      correctCount++;
    }
  });

  // Update attempted subjects
  console.log(correctCount);
  // Save answers
  res.json({ success: true });
};
