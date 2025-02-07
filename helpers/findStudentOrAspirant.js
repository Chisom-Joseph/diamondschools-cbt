const { Aspirant, Student } = require("../models");

module.exports = async (id) => {
  try {
    if (!id) return {};

    const student = await Student.findOne({
      where: { id },
    });
    if (student) {
      student.dataValues.examinationNumber =
        student.dataValues.registrationNumber;
      return { candidate: student.dataValues, isAspirant: false };
    }

    const aspirant = await Aspirant.findOne({
      where: { id },
    });
    if (aspirant) return { candidate: aspirant.dataValues, isAspirant: true };

    return {};
  } catch (error) {
    console.error("ERROR GETING ASPIRANT OR STUDENT");
    console.error(error);
    return {};
  }
};
