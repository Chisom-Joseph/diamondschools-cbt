const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const loginSchema = require("../../validation/login.schema");

const { Student } = require("../../models");

module.exports = async (req, res) => {
  try {
    const { registrationNumber, password, rememberMe } = req.body;

    console.log(req.body);

    // Validate Student
    const studentValid = loginSchema.validate(req.body, {
      errors: { wrap: { label: false } },
    });
    if (studentValid.error)
      return res.status(400).render("auth/login", {
        error: true,
        message: studentValid.error.details[0].message,
        form: req.body,
      });

    // Check if student exists
    const student = await Student.findOne({ where: { registrationNumber } });
    if (!student) {
      return res.status(400).render("auth/login", {
        error: true,
        message: "Invalid Registration Number or Password",
        form: req.body,
      });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, student.password);
    if (!passwordMatch) {
      return res.status(400).render("auth/login", {
        error: true,
        message: "Invalid Registration Number or Password",
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
      id: studentId,
      username,
      firstName,
      middleName,
      lastName,
      level,
      email,
    } = student.dataValues;

    const token = jwt.sign({ studentId }, process.env.S_TOKEN_SECRET, {
      expiresIn,
    });
    res.cookie("sToken", token, { expires, path: "/" });

    req.session.cookie.maxAge = expiresIn;
    req.session.student = {
      id: studentId,
      username,
      firstName,
      middleName,
      lastName,
      registrationNumber: student.registrationNumber,
      level: await require("../../helpers/getLevel")(level),
      email,
      password,
    };
    req.session.student = student;

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
