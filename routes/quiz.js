const router = require("express").Router();

router.get(
  "/:subjectId",
  require("../middlewares/verifySubject"),
  (req, res) => {
    console.log(req.subject);
    res.render("quiz", {
      quizOptionNames: require("../helpers/getQuizOptionNames")(),
      quizQuestions: require("../helpers/getQuizQuestions")(),
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
