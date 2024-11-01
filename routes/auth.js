const router = require("express").Router();

// Login route
router.get("/login", (req, res) => {
  res.render("auth/login");
});
router.post("/login", require("../controllers/auth/login"));

// Login route
router.get("/register", async (req, res) => {
  res.render("auth/register", {
    error: false,
    form: {},
    levels: await require("../controllers/getLevels")(),
  });
});
router.post("/register", require("../controllers/auth/register"));

module.exports = router;
