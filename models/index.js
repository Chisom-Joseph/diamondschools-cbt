const dbConfig = require("../config/db.config");
const { Sequelize, DataTypes } = require("sequelize");

const Student = require("./Student");
const Level = require("./Level");
const AttemptedSubject = require("./AttemptedSubject");
const Subject = require("./Subject");
const Question = require("./Question");
const Option = require("./Option");
const OptionNames = require("./OptionNames");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  polli: {
    min: dbConfig.poll.min,
    max: dbConfig.poll.max,
    aquire: dbConfig.poll.acquire,
    idle: dbConfig.poll.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// DBs
db.Student = Student(sequelize, DataTypes);
db.Level = Level(sequelize, DataTypes);
db.AttemptedSubject = AttemptedSubject(sequelize, DataTypes);
db.Subject = Subject(sequelize, DataTypes);
db.Question = Question(sequelize, DataTypes);
db.Option = Option(sequelize, DataTypes);
db.OptionNames = OptionNames(sequelize, DataTypes);

// Associations
db.Student.belongsTo(db.Level);
db.Level.hasMany(db.Student);

db.AttemptedSubject.belongsTo(db.Student);
db.Student.hasMany(db.AttemptedSubject);

db.Subject.belongsTo(db.Level);
db.Level.hasMany(db.Subject);

db.AttemptedSubject.belongsTo(db.Subject);
db.Subject.hasMany(db.AttemptedSubject);

db.Question.belongsTo(db.Subject);
db.Subject.hasMany(db.Question);

db.Option.belongsTo(db.Question);
db.Question.hasMany(db.Option);

module.exports = db;
