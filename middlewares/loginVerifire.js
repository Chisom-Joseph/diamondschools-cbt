const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req?.cookies?.cToken;
  const authRoutes = ["/auth/login"];
  try {
    if (!token && !authRoutes.includes(req.originalUrl)) {
      res.clearCookie("cToken");
      return res.redirect("/auth/login");
    }

    if (!token && authRoutes.includes(req.originalUrl)) {
      next();
    }

    const tokenVerified = jwt.verify(token, process.env.CANDIDATE_TOKEN_SECRET);

    if (!tokenVerified && authRoutes.includes(req.originalUrl)) {
      return res.redirect("/auth/login");
    }

    if (tokenVerified && authRoutes.includes(req.originalUrl)) {
      return res.redirect("/dashboard");
    }

    if (!tokenVerified && !authRoutes.includes(req.originalUrl)) {
      return res.redirect("/auth/login");
    }

    let candidate = await require("../helpers/findStudentOrAspirant")(
      tokenVerified.id
    );

    if (Object.keys(candidate).length === 0) {
      res.clearCookie("cToken");
      return res.redirect("/auth/login");
    }

    req.candidate = candidate.candidate;
    req.isAspirant = candidate.isAspirant;
    res.locals.candidate = candidate;
    res.locals.isLoggedin = true;
    return next();
  } catch (error) {
    console.error("ERROR VERIFING LOGIN");
    console.error(error);
  }
};
