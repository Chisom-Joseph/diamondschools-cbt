const bcrypt = require("bcryptjs");
const loginSchema = require("../../validation/login.schema");

const { Student } = require("../../models");

module.exports = async (req, res) => {
  try {
    const {
      username,
      firstName,
      middleName,
      lastName,
      registrationNumber,
      level,
      password,
    } = req.body;

    console.log(req.body);

    // Validate Student
    const studentValid = loginSchema.validate(req.body, {
      errors: { wrap: { label: false } },
    });
    if (studentValid.error)
      return res.status(400).render("auth/login", {
        error: true,
        message: studentValid.error.details[0].message,
        levels: await require("../../controllers/getLevels")(),
        form: req.body,
      });

    // Check if username already exists
    const student = await Student.findOne({ where: { username } });
    if (student) {
      return res.status(400).render("auth/login", {
        error: true,
        message: "Username already exists",
        levels: await require("../../controllers/getLevels")(),
        form: req.body,
      });
    }

    // Create student
    const salt = await bcrypt.genSalt(parseInt(process.env.PASSWORD_SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newStudent = await Student.create({
      username,
      firstName,
      middleName,
      lastName,
      registrationNumber,
      LevelId: level,
      password: hashedPassword,
    });

    console.log(newStudent);

    // Login student
    res.redirect("/auth/login");
  } catch (error) {
    console.log(error);
    res.render("auth/register", {
      error: true,
      message: "Something went wrong",
      levels: await require("../../controllers/getLevels")(),
      form: req.body,
    });
  }
};
