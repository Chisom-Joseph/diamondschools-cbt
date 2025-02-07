const router = require("express").Router();

// Login route
router.get("/login", (req, res) => {
  res.render("auth/login", {
    error: false,
    form: [],
  });
});
router.post("/login", require("../controllers/auth/login"));

// Login route
router.get("/register", async (req, res) => {
  res.render("auth/register", {
    error: false,
    form: {},
    levels: await require("../helpers/getLevels")(),
  });
});
router.post("/register", require("../controllers/auth/register"));

router.get("/logout", (req, res) => {
  res.clearCookie("cToken", { path: "/" }).redirect("/auth/login");
});

module.exports = router;
