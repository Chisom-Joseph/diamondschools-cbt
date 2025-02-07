const jwt = require("jsonwebtoken");
const loginSchema = require("../../validation/login.schema");

module.exports = async (req, res) => {
  try {
    const { rememberMe } = req.body;

    // Validate Aspirant
    const aspirantValid = loginSchema.validate(req.body, {
      errors: { wrap: { label: false } },
    });
    if (aspirantValid.error)
      return res.status(400).render("auth/login", {
        error: true,
        message: aspirantValid.error.details[0].message,
        form: req.body,
      });

    // Check if aspirant or student exists
    const candidate =
      await require("../../helpers/findStudentOrAspirantByExaminationNumber")(
        req.body.examinationNumber
      );

    if (!candidate) {
      return res.status(400).render("auth/login", {
        error: true,
        message: "Invalid Login",
        form: req.body,
      });
    }

    let expires =
      rememberMe === "on"
        ? new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        : new Date(Date.now() + 2 * 60 * 60 * 1000);
    let expiresIn =
      rememberMe === "on" ? 3 * 24 * 60 * 60 * 1000 : 2 * 60 * 60 * 1000;
    const {
      id: candidateId,
      username,
      firstName,
      middleName,
      lastName,
      email,
    } = candidate.candidate;

    const token = jwt.sign(
      { id: candidateId },
      process.env.CANDIDATE_TOKEN_SECRET,
      {
        expiresIn,
      }
    );
    res.cookie("cToken", token, { expires, path: "/" });

    req.session.cookie.maxAge = expiresIn;
    req.session.candidate = {
      id: candidateId,
      username,
      firstName,
      middleName,
      lastName,
      examinationNumber: candidate.examinationNumber,
      class: await require("../../helpers/getClass")(candidate.candidateclass),
      email,
    };
    req.session.candidate = candidate;

    res.redirect("/quiz/exam-details");
  } catch (error) {
    console.log(error);
    res.render("auth/login", {
      error: true,
      message: "Something went wrong",
      form: req.body,
    });
  }
};
