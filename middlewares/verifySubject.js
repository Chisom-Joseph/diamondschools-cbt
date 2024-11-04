const { AttemptedSubject, Subject, Question } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const subjectId = req.params.subjectId;

    // Check if subject id is provided
    if (!subjectId) {
      return res.status(400).send("Subject id is required");
    }

    // Check if subject exists
    const subjectFromDb = await Subject.findOne({ where: { id: subjectId } });
    if (subjectFromDb === null) {
      return res.status(404).send("Subject not found");
    }

    // Check if questions are available for subject
    const questionCount = await Question.count({
      where: { SubjectId: subjectFromDb.dataValues.id },
    });
    if (questionCount <= 0) subjectFromDb.dataValues.active = false;

    // Check if subject is active
    if (!subjectFromDb.dataValues.active)
      return res.status(400).render("error", {
        title: "Subject Unavailable",
        message: "Subject has been disabled by admin",
      });

    // Check if subject has attempted
    const attemptedSubject = await AttemptedSubject.findOne({
      where: {
        SubjectId: subjectId,
        StudentId: req.session.student.id,
      },
    });
    if (attemptedSubject) {
      return res.status(400).render("info", {
        title: "Exam Attempted",
        message: "Exam has already been taken by you",
      });
    }

    // Add subject to request
    req.subject = subjectFromDb.dataValues;
    req.session.subject = subjectFromDb.dataValues;
    next();
  } catch (error) {
    console.log(error);
  }
};
