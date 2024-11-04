const { Student } = require("../models");

module.exports = async (id) => {
  try {
    if (!id) return res.status(404).send("Error");
    const student = await Student.findOne({ id });

    if (!student) return res.clearCookie("sToken").redirect("/auth/login");
    student.dataValues.level = await require("./getLevel")(
      student.dataValues.levelId
    );
    return student ? student.dataValues : {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
