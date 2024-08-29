const UserRepository = require("../../../database/repository/userRepository");

const getUserService = async (body) => {
  console.time("🚀 ~ getUserService ~ time");
  try {
    const result = await UserRepository.getByKey(body);
    delete result.password;
    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ getUserService ~ error:", error);
    throw { status: 200, message: error };
  } finally {
    console.timeEnd("🚀 ~ getUserService ~ time");
  }
};

module.exports = { getUserService };
