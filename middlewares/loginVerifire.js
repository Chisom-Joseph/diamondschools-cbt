const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.sToken;

    const isAuthRoute = ["/auth/login", "/auth/register"].includes(
      req.originalUrl
    );

    if (!token) {
      return isAuthRoute ? next() : res.redirect("/auth/login");
    }

    const decodedToken = jwt.verify(token, process.env.S_TOKEN_SECRET);

    if (!req.session.student && decodedToken) {
      req.session.student = req.student =
        await require("../helpers/getStudent")(decodedToken.studentId);
    }

    if (isAuthRoute) {
      return res.redirect("/");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      error: new Error("Requête invalide !"),
    });
  }
};
