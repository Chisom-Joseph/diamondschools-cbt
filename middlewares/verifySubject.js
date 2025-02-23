const { AttemptedSubject, Subject, Question } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const subjectId = req.params.subjectId;

    // Check if subject id is provided
    if (!subjectId) {
      return res.status(400).render("message", {
        title: "Invalid subject",
        message: {
          title: "Invalid subject",
          body: "Subject not found",
          button: "Go Home",
          buttonLink: "/",
        },
      });
    }

    // Check if subject exists
    const subjectFromDb = await Subject.findOne({ where: { id: subjectId } });
    if (subjectFromDb === null) {
      return res.status(400).render("message", {
        title: "Invalid subject",
        message: {
          title: "Invalid subject",
          body: "Subject not found",
          button: "Go Home",
          buttonLink: "/",
        },
      });
    }

    // Check if questions are available for subject
    const questionCount = await Question.count({
      where: { SubjectId: subjectFromDb.dataValues.id },
    });
    if (questionCount <= 0) subjectFromDb.dataValues.active = false;

    // Check if subject is active
    if (!subjectFromDb.dataValues.active)
      return res.render("message", {
        title: "Subject Unavailable",
        message: {
          title: "Subject Unavailable",
          body: "Subject has been disabled by admin",
          button: "Go Home",
          buttonLink: "/",
        },
      });

    // Check if subject has attempted
    let attemptedSubject;
    if (req.isAspirant) {
      attemptedSubject = await AttemptedSubject.findOne({
        where: {
          SubjectId: subjectId,
          AspirantId: req.candidate.id,
        },
      });
    } else {
      attemptedSubject = await AttemptedSubject.findOne({
        where: {
          SubjectId: subjectId,
          StudentId: req.candidate.id,
        },
      });
    }

    if (attemptedSubject) {
      res.render("message", {
        title: "Exam Attempted",
        message: {
          title: "Exam Attempted",
          body: "Exam has already been taken by you",
          button: "Go Home",
          buttonLink: "/",
        },
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
