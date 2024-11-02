const { Student } = require("../models");

module.exports = async (id) => {
  try {
    const student = await Student.findOne({ id });
    student.dataValues.level = await require("./getLevel")(
      student.dataValues.levelId
    );
    return student ? student.dataValues : {};
  } catch (error) {
    console.log(error);
    return {};
  }
};
