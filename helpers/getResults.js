const { AttemptedSubject, Subject, Aspirant } = require("../models");
const { Op } = require("sequelize");
module.exports = async (id) => {
  try {
    const results = [];

    const attemptedSubjectFromDb = await AttemptedSubject.findAll({
      where: { [Op.or]: [{ StudentId: id }, { AspirantId: id }] },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
      ],
    });

    console.log(attemptedSubjectFromDb);

    await Promise.all(
      attemptedSubjectFromDb.map(async (attemptedSubject) => {
        results.push({
          ...attemptedSubject.dataValues,
          date: require("./formatDate")(
            parseInt(attemptedSubject.dataValues.date)
          ),
          subject: attemptedSubject.dataValues.Subject.dataValues,
        });
      })
    );

    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return [];
  }
};
