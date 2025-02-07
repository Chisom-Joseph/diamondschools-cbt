const { Aspirant, Student } = require("../models");

module.exports = async (param) => {
  try {
    if (!param) return {};

    const student = await Student.findOne({
      where: { registrationNumber: param },
    });
    if (student) {
      student.dataValues.examinationNumber =
        student.dataValues.registrationNumber;
      return { candidate: student.dataValues, isAspirant: false };
    }

    const aspirant = await Aspirant.findOne({
      where: { examinationNumber: param },
    });
    if (aspirant) return { candidate: aspirant.dataValues, isAspirant: true };

    return {};
  } catch (error) {
    console.error("ERROR GETING ASPIRANT OR STUDENT");
    console.error(error);
    return {};
  }
};
