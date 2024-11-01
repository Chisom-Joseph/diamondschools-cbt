module.exports = (sequelize, DataTypes) => {
  const Level = sequelize.define("Level", {
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
    date: {
      type: DataTypes.STRING,
      defaultValue: Date.now(),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });
  return Level;
};
