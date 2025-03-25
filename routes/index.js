const router = require("express").Router();

router.use(require("../middlewares/loginVerifire"));
const verifyAccess = require("../middlewares/verifyAccess");
router.use("/quiz", verifyAccess, require("./quiz"));
router.use("/auth", require("./auth"));

// Home
router.get("/", (req, res) => {
  res.redirect("/quiz/exam-details");
});

// Temp admin route
router.get("/admin/result", verifyAccess, async (req, res) => {
  res.render("tempResult", {
    results: await require("../helpers/getResults")(req.candidate.id),
  });
});

// 404
router.get("*", (req, res) => {
  res.status(404).render("error", {
    title: "Page not found",
    message: "Recourse not found",
  });
});

module.exports = router;
