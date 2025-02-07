const getFeatureFlagsForUser = require("../services/featureFlagService");

module.exports = async (req, res, next) => {
  try {
    const userRole = req.user?.role || "all";
    res.locals.featureFlags = await getFeatureFlagsForUser(userRole);
  } catch (error) {
    console.error("Error in feature flag middleware:", error);
    res.locals.featureFlags = {};
  }

  next();
};
