const { Level, Subject } = require("./models");

const levels = ["JSS1", "JSS2", "JSS3", "SSS1", "SSS2", "SSS3"];

const subjects = [
  // Jss1
  {
    name: "Mathematics",
    LevelId: "a11eb269-6915-41e7-8eeb-36bf8013d4ac",
  },
  {
    name: "Social Studies",
    LevelId: "a11eb269-6915-41e7-8eeb-36bf8013d4ac",
  },
  {
    name: "English",
    LevelId: "a11eb269-6915-41e7-8eeb-36bf8013d4ac",
  },
  {
    name: "Literature",
    LevelId: "a11eb269-6915-41e7-8eeb-36bf8013d4ac",
  },

  // Jss2
  {
    name: "Mathematics",
    LevelId: "a787a67b-1a82-417a-8218-b6f1ece81c3c",
  },
  {
    name: "Social Studies",
    LevelId: "a787a67b-1a82-417a-8218-b6f1ece81c3c",
  },
  {
    name: "English",
    LevelId: "a787a67b-1a82-417a-8218-b6f1ece81c3c",
  },
  {
    name: "Literature",
    LevelId: "a787a67b-1a82-417a-8218-b6f1ece81c3c",
  },

  // Jss3
  {
    name: "Mathematics",
    LevelId: "e6eb3748-319a-48d6-9b18-a8119bb6367d",
  },
  {
    name: "Social Studies",
    LevelId: "e6eb3748-319a-48d6-9b18-a8119bb6367d",
  },
  {
    name: "English",
    LevelId: "e6eb3748-319a-48d6-9b18-a8119bb6367d",
  },
  {
    name: "Literature",
    LevelId: "e6eb3748-319a-48d6-9b18-a8119bb6367d",
  },

  // Sss1
  {
    name: "Mathematics",
    LevelId: "1a15091f-793a-46ee-bcb4-25a1e708bc9a",
  },
  {
    name: "Biology",
    LevelId: "1a15091f-793a-46ee-bcb4-25a1e708bc9a",
  },
  {
    name: "English",
    LevelId: "1a15091f-793a-46ee-bcb4-25a1e708bc9a",
  },
  {
    name: "Government",
    LevelId: "1a15091f-793a-46ee-bcb4-25a1e708bc9a",
  },

  // Sss2
  {
    name: "Mathematics",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
  },
  {
    name: "Biology",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
  },
  {
    name: "English",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
  },
  {
    name: "Government",
    LevelId: "df798ff4-e894-4835-9e68-91ffdd8534a2",
  },

  // Sss3
  {
    name: "Mathematics",
    LevelId: "28741eeb-d1e1-41cd-b0d3-f650560f2a49",
  },
  {
    name: "Biology",
    LevelId: "28741eeb-d1e1-41cd-b0d3-f650560f2a49",
  },
  {
    name: "English",
    LevelId: "28741eeb-d1e1-41cd-b0d3-f650560f2a49",
  },
  {
    name: "Government",
    LevelId: "28741eeb-d1e1-41cd-b0d3-f650560f2a49",
  },
];

module.exports = async (req, res, next) => {
  // Add levels
  const levelsFromDb = await Level.findAll();
  if (levelsFromDb.length <= 0)
    levels.forEach((name) => {
      Level.create({ name });
    });

  const subjectsFromDb = await Subject.findAll();
  if (subjectsFromDb.length <= 0)
    subjects.forEach((subject) => {
      Subject.create(subject);
    });

  next();
};
