const { AttemptedSubject, Subject } = require("../models");

module.exports = async (StudentId) => {
  try {
    const results = [];

    const attemptedSubjectFromDb = await AttemptedSubject.findAll({
      where: { StudentId },
      include: [
        {
          model: Subject,
          attributes: ["name"],
        },
      ],
    });

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
