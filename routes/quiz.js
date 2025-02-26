const router = require("express").Router();

router.get("/exam-details", async (req, res) => {
  res.render("quiz/examDetails", {
    subjects: await require("../helpers/getSubjectsByClass")({
      ClassId: req.candidate.ClassId,
      For: req.isAspirant ? "aspirant" : "student",
    }),
    candidate: req.candidate,
  });
});

router.get("/after-exam", async (req, res) => {
  if (!req.session.showAfterExamPage)
    return res.render("message", {
      title: "Exam completed",
      message: {
        title: "Exam completed",
        body: "Exam completed and submitted successfully",
        button: "Go Home",
        buttonLink: "/",
      },
    });
  res.render("quiz/afterQuiz");
  req.session.showAfterExamPage = false;
  req.session.save();
});

router.get(
  "/:subjectId",
  require("../middlewares/verifySubject"),
  async (req, res) => {
    res.render("quiz/quiz", {
      quizOptionNames: await require("../helpers/getQuizOptionNames")(),
      quizQuestions: await require("../helpers/getQuizQuestions")({
        SubjectId: req.params.subjectId,
        For: req.isAspirant ? "aspirant" : "student",
        ClassId: req.candidate.ClassId,
      }),
      subject: req.subject,
      examSettings: (await require("../helpers/getExamSettings")()) || "",
    });
  }
);
router.post(
  "/:subjectId",
  require("../middlewares/verifySubject"),
  require("../controllers/quiz")
);

module.exports = router;
