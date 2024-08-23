const {
  responsePartnerAPI,
} = require("../../lib/formatBuildAPI/buildResponseParam");
const {
  decryptRequestBody,
  validateObjectToSchema,
} = require("../../lib/helper");
const { userSchema } = require("../../lib/helper/schemas");
const responseMessage = require("../../lib/build-response/responseMessage.json");
const authService = require("../services/authentication.service");

exports.signIn = async (req, res, next) => {
  try {
    const where = req.body;
    console.log("🚀  where:", where);
    const activities = await authService.getUserauth(where);
    res.json(activities);
  } catch (error) {
    next(error); // pass the error to the error handling middleware
  }
};

exports.signOn = async (req, res, next) => {
  let isEncrypt = process.env.IS_ENCRYPT;
  let keySecret = process.env.KEY_SECRET;
  try {
    const responseDecryptBody = decryptRequestBody({
      req,
      isEncrypt,
      keySecret,
    });

    if (!responseDecryptBody.status) {
      return responseDecryptBody.data;
    }
    bodyDecrypt = responseDecryptBody.data;
    console.log("bodyDecrypt ::", bodyDecrypt);

    const {
      success,
      data: body,
      errors,
    } = validateObjectToSchema(bodyDecrypt, userSchema);

    if (!success) {
      return responsePartnerAPI({
        isEncrypt,
        keySecret,
        responses: responseMessage,
        statusCode: 400,
        responseData: { errors },
        responseCode: "E9003",
      });
    }
    console.log("🚀  body:", body);
    const activities = await authService.signOnService(body);
    res.json(activities);
  } catch (error) {
    next(error); // pass the error to the error handling middleware
  }
};
