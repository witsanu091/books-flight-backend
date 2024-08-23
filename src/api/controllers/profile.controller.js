const profileService = require("../services/profile.service");

exports.getUserProfile = async (req, res, next) => {
  try {
    const where = req.body;
    console.log("🚀  where:", where);
    const activities = await profileService.getUserProfile(where);
    res.json(activities);
  } catch (error) {
    next(error); // pass the error to the error handling middleware
  }
};
