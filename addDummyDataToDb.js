const { Level, Subject } = require("./models");

const levels = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

const subjects = [
  // Jss1
  {
    name: "Mathematics",
    LevelId: "cc976931-00f6-47c7-94e1-55cee94e801e",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Social Studies",
    LevelId: "cc976931-00f6-47c7-94e1-55cee94e801e",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "cc976931-00f6-47c7-94e1-55cee94e801e",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Literature",
    LevelId: "cc976931-00f6-47c7-94e1-55cee94e801e",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },

  // Jss2
  {
    name: "Mathematics",
    LevelId: "c0e39c0b-456c-4e2c-b8f6-80f36dc51f88",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Social Studies",
    LevelId: "c0e39c0b-456c-4e2c-b8f6-80f36dc51f88",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "c0e39c0b-456c-4e2c-b8f6-80f36dc51f88",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Literature",
    LevelId: "c0e39c0b-456c-4e2c-b8f6-80f36dc51f88",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },

  // Jss3
  {
    name: "Mathematics",
    LevelId: "d7bd9e07-981c-4952-b091-26fd80f0fca6",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Social Studies",
    LevelId: "d7bd9e07-981c-4952-b091-26fd80f0fca6",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "d7bd9e07-981c-4952-b091-26fd80f0fca6",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Literature",
    LevelId: "d7bd9e07-981c-4952-b091-26fd80f0fca6",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },

  // Sss1
  {
    name: "Mathematics",
    LevelId: "169b558a-2ef4-4701-bc8f-888dc054616a",
    active: true,
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Biology",
    LevelId: "169b558a-2ef4-4701-bc8f-888dc054616a",
    active: true,
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "169b558a-2ef4-4701-bc8f-888dc054616a",
    active: true,
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Government",
    LevelId: "169b558a-2ef4-4701-bc8f-888dc054616a",
    active: true,
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },

  // Sss2
  {
    name: "Mathematics",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Biology",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Government",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },

  // Sss3
  {
    name: "Mathematics",
    LevelId: "9cc0b15c-866a-4e0b-9eae-78291fa4d43f",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Biology",
    LevelId: "9cc0b15c-866a-4e0b-9eae-78291fa4d43f",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "English",
    LevelId: "9cc0b15c-866a-4e0b-9eae-78291fa4d43f",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
  {
    name: "Government",
    LevelId: "9cc0b15c-866a-4e0b-9eae-78291fa4d43f",
    instructions: "Atempt All questions in this subject",
    duration: 30,
  },
];

module.exports = async (req, res, next) => {
  // Add levels
  const levelsFromDb = await Level.findAll();
  if (levelsFromDb.length <= 0)
    levels.forEach((name) => {
      Level.create({ name });
    });

  // Add subjects
  const subjectsFromDb = await Subject.findAll();
  if (levelsFromDb.length > 0 && subjectsFromDb.length <= 0)
    subjects.forEach((subject) => {
      Subject.create(subject);
    });

  next();
};
