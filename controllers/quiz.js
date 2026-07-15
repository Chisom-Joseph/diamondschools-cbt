const { AttemptedSubject, Question, Option } = require("../models");

module.exports = async (req, res) => {
  const questionWithTerm = await Question.findOne({
    where: { SubjectId: req.params.subjectId },
    attributes: ["TermId"], // Get only the TermId
  });

  let TermId = null;

  if (questionWithTerm) {
    TermId = questionWithTerm.TermId;
  }

  const totalQuestions = await Question.count({
    where: { SubjectId: req.params.subjectId },
  });
  console.log(`Total Questions: ${totalQuestions}`);
  const userAnswers = req.body.answers;
  let correctCount = 0;

  //   Check if answer is correct in a single query
  const optionIds = userAnswers.map(ua => ua.optionId).filter(id => id);
  if (optionIds.length > 0) {
    const options = await Option.findAll({
      where: { id: optionIds },
      attributes: ["id", "correct"],
    });

    const correctOptionIds = new Set(
      options.filter(o => o.correct).map(o => o.id)
    );

    userAnswers.forEach((userAnswer) => {
      if (correctOptionIds.has(userAnswer.optionId)) {
        correctCount++;
      }
    });
  }

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
    ...(req.isAspirant
      ? { AspirantId: req.candidate.id }
      : { StudentId: req.candidate.id }),
    SubjectId: req.subject.id,
    correctCount,
    totalQuestions,
    scorePercentage: (correctCount / totalQuestions) * 100,
    totalAnswered: userAnswers.length,
    TermId,
  });

  // Update attempted subjects
  console.log(`Correct count = ${correctCount}`);
  // console.log(updatedAttemptedSubjects);

  // Save answers
  req.showAfterExamPage = true;
  res.json({ success: true, redirect: "/quiz/after-exam" });
};
