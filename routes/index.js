const router = require("express").Router();

router.use("/quiz", require("./quiz"));

// Home
router.get("/", (req, res) => {
  res.render("home");
});

// 404
router.get("*", (req, res) => {
  res.status(404).send("Not found");
});

module.exports = router;
