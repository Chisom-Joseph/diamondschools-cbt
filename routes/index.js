const router = require("express").Router();

router.use(require("../middlewares/loginVerifire"));
router.use(require("../middlewares/verifyAccess"));

router.use("/quiz", require("./quiz"));
router.use("/auth", require("./auth"));

// Home
router.get("/", (req, res) => {
  res.redirect("/quiz/exam-details");
});

// Temp admin route
router.get("/admin/result", async (req, res) => {
  res.render("tempResult", {
    results: await require("../helpers/getResults")(req.candidate.id),
  });
});

router.get("/addLevel", async (req, res) => {
  try {
    const { Level } = require("../models");

    const level = {
      name: "SSS1",
    };

    const newLevel = await Level.create(level);
    console.log(newLevel);
    return res.json(newLevel);
  } catch (error) {
    console.log("ERROR ADDING LEVEL");
    console.log(error);
  }
});

// 404
router.get("*", (req, res) => {
  res.status(404).render("error", {
    title: "Page not found",
    message: "Recourse not found",
  });
});

module.exports = router;
