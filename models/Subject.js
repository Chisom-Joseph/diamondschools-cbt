module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("Subject", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    instructions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    duration: {
      type: DataTypes.FLOAT,
      defaultValue: 30,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date: {
      type: DataTypes.STRING,
      defaultValue: Date.now(),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Subject;
};
