const { AttemptedSubject, Question, Option } = require("../models");

module.exports = async (req, res) => {
  const totalQuestions = await Question.count({
    where: { SubjectId: req.params.subjectId },
  });
  console.log(`Total Questions: ${totalQuestions}`);
  const userAnswers = req.body.answers;
  let correctCount = 0;

  //   Check if answer is correct
  await Promise.all(
    userAnswers.map(async (userAnswer) => {
      const currentOption = await Option.findOne({
        where: { id: userAnswer.optionId },
      });

      // Check if answer is correct
      if (currentOption && currentOption.dataValues.correct) correctCount++;
    })
  );

  let attemptedSubject;
  // Check if attempted subject exists
  if (req.isAspirant) {
    attemptedSubject = await AttemptedSubject.findOne({
      where: {
        SubjectId: req.subject.id,
        AspirantId: req.candidate.id,
      },
    });
    console.log(attemptedSubject);
  } else {
    attemptedSubject = await AttemptedSubject.findOne({
      where: {
        SubjectId: req.subject.id,
        StudentId: req.candidate.id,
      },
    });
    console.log(attemptedSubject);
  }
  if (attemptedSubject) {
    return res.status(400).send("Subject has already been attempted by you");
  }

  // Update AttemptedSubjects
  const updatedAttemptedSubjects = await AttemptedSubject.create({
    StudentId: req.candidate.id,
    SubjectId: req.subject.id,
    correctCount,
    totalQuestions,
    scorePercentage: (correctCount / totalQuestions) * 100,
    totalAnswered: userAnswers.length,
  });

  // Update attempted subjects
  console.log(`Correct count = ${correctCount}`);
  // console.log(updatedAttemptedSubjects);

  // Save answers
  req.showAfterExamPage = true;
  res.json({ success: true, redirect: "/quiz/after-exam" });
};
