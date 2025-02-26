const router = require("express").Router();

// Login route
router.get("/login", (req, res) => {
  res.render("auth/login", {
    error: false,
    form: [],
  });
});
router.post("/login", require("../controllers/auth/login"));

router.get("/logout", (req, res) => {
  res
    .clearCookie("cToken", { path: "/" })
    .cookie("clearLocalStorage", "true", { maxAge: 5000, httpOnly: false })
    .redirect("/auth/login");
});

module.exports = router;
