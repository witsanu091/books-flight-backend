const UserRepository = require("../../database/repository/user-repository");

const getUserProfile = async (body) => {
  let user_id = body.user_id;
  console.log(`🚀 ~ getUserProfile ~ user_id:${user_id}`);
  console.time("🚀 ~ getUserProfile ~ time");
  try {
    const userProfile = await UserRepository.getAllByKey({
      user_id,
    });
    console.log(userProfile);
    return userProfile;
  } catch (error) {
    console.error("🚀 ~ getUserProfile ~ error:", error);
    throw error;
  } finally {
    console.timeEnd("🚀 ~ getUserProfile ~ time");
  }
};

module.exports = { getUserProfile };
