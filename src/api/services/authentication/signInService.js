const jwt = require("jsonwebtoken");
const UserRepository = require("../../../database/repository/userRepository");
const { encryptCBC256 } = require("../../../database/tools/encryptionField");

const signInService = async (body) => {
  console.time("🚀 ~ signOnService ~ time");
  try {
    if (!body.email) {
      delete body.email;
    } else {
      body.email = encryptCBC256(body.email);
    }
    if (!body.user_name) delete body.user_name;
    body = { ...body, password: encryptCBC256(body.password), enabled: true };
    let result = await UserRepository.getByKey(body);
    if (result.length === 0)
      return {
        status: 404,
        message: "Username or Password Invalid",
        data: null,
      };
    result = {
      user_id: result.user_id,
      user_role: result.user_role,
    };

    const token = jwt.sign(result, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    result = { ...result, token_id: token };

    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ signOnService ~ error:", error);
    throw { status: 500, message: error, data: null };
  } finally {
    console.timeEnd("🚀 ~ signOnService ~ time");
  }
};

module.exports = { signInService };
