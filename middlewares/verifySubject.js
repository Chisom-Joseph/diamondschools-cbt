const { subjects } = require("../data");

module.exports = (req, res, next) => {
  const subjectId = req.params.subjectId;
  //   Check if subject id is provided
  if (!subjectId) {
    return res.status(400).send("Subject id is required");
  }

  //   Check if subject exists
  if (!subjects.find((subject) => subject.id === subjectId)) {
    return res.status(404).send("Subject not found");
  }

  //   Add subject to request
  req.subject = subjects.find((subject) => subject.id === subjectId);
  next();
};
