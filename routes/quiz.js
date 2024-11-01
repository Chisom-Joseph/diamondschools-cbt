const router = require("express").Router();

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  res.render("quiz", {
    quizOptionNames: require("../helpers/getQuizOptionNames")(),
    quizQuestions: require("../helpers/getQuizQuestions")(),
  });
});

module.exports = router;
