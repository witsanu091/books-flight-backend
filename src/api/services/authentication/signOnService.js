const UserRepository = require("../../../database/repository/userRepository");

const signOnService = async (body) => {
  console.time("🚀 ~ signOnService ~ time");
  try {
    await UserRepository.add(body);
    return { status: 200, message: "success" };
  } catch (error) {
    console.error("🚀 ~ signOnService ~ error:", error);
    throw { status: 200, message: error };
  } finally {
    console.timeEnd("🚀 ~ signOnService ~ time");
  }
};

module.exports = { signOnService };
