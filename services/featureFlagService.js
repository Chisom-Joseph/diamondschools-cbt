const { FeatureFlag, Sequelize } = require("../models");

module.exports = async (role) => {
  try {
    const featureFlags = await FeatureFlag.findAll({
      where: {
        [Sequelize.Op.or]: [{ userRole: "all" }, { userRole: role }],
        isEnabled: true,
      },
    });

    console.log(
      featureFlags.reduce((flags, flag) => {
        flags[flag.name] = flag.isEnabled;
        return flags;
      }, {})
    );

    // Convert to an object for easy access in templates
    return featureFlags.reduce((flags, flag) => {
      flags[flag.name] = flag.isEnabled;
      return flags;
    }, {});
  } catch (error) {
    console.log(error);
    return {};
  }
};
