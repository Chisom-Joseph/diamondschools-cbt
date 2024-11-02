const router = require("express").Router();

router.use(require("../middlewares/loginVerifire"));
router.use(require("../addDummyDataToDb"));
router.use("/quiz", require("./quiz"));
router.use("/auth", require("./auth"));

// Home
router.get("/", (req, res) => {
  res.redirect("/quiz/quiz-details");
});

// 404
router.get("*", (req, res) => {
  res.status(404).send("Not found");
});

module.exports = router;
