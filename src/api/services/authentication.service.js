const UserRepository = require("../../database/repository/user-repository");

const signOnService = async (body) => {
  console.time("🚀 ~ signOnService ~ time");
  try {
    const signOnResult = await UserRepository.add(body);
    console.log(signOnResult);
    return signOnResult;
  } catch (error) {
    console.error("🚀 ~ signOnService ~ error:", error);
    throw error;
  } finally {
    console.timeEnd("🚀 ~ signOnService ~ time");
  }
};

module.exports = { signOnService };
