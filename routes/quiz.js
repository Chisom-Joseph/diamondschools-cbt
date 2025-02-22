const router = require("express").Router();

router.get("/exam-details", async (req, res) => {
  res.render("quiz/examDetails", {
    subjects: await require("../helpers/getSubjectsByClass")(
      req.candidate.ClassId
    ),
    candidate: req.candidate,
  });
});

router.get("/after-exam", async (req, res) => {
  if (!req.session.showAfterExamPage)
    return res.render("error", {
      title: "Access Denied",
      message: "Access Denied",
    });
  res.render("quiz/afterQuiz");
  req.session.showAfterExamPage = false;
  req.session.save();
});

router.get(
  "/:subjectId",
  require("../middlewares/verifySubject"),
  async (req, res) => {
    console.log(req.subject);
    console.log(await require("../helpers/getQuizOptionNames")());
    res.render("quiz/quiz", {
      quizOptionNames: await require("../helpers/getQuizOptionNames")(),
      quizQuestions: await require("../helpers/getQuizQuestions")(
        req.params.subjectId
      ),
      subject: req.subject,
    });
  }
);
router.post(
  "/:subjectId",
  require("../middlewares/verifySubject"),
  require("../controllers/quiz")
);

module.exports = router;
