const {
  responsePartnerAPI,
} = require("../../../lib/formatBuildAPI/buildResponseParam");
const {
  decryptRequestBody,
  validateObjectToSchema,
  insertServiceHistoryLog,
} = require("../../../lib/helper");
const { userSchema } = require("../../../lib/helper/schemas");
const responseMessage = require("../../../lib/build-response/responseMessage.json");
const authService = require("../../services/authentication/signOnService");

exports.signOn = async (req, res, next) => {
  const isEncrypt = process.env.IS_ENCRYPT;
  const keySecret = process.env.KEY_SECRET;
  let response;
  let objectHistory = {
    type: "sign on",
    request: req.body,
    response: response,
    status: "400",
  };
  try {
    const responseDecryptBody = decryptRequestBody({
      req,
      isEncrypt,
      keySecret,
    });

    if (!responseDecryptBody.status) {
      response = responseDecryptBody.data;
      return res.json(response);
    }
    bodyDecrypt = responseDecryptBody.data;
    console.log("bodyDecrypt ::", bodyDecrypt);

    const {
      success,
      data: body,
      errors,
    } = validateObjectToSchema(bodyDecrypt, userSchema);

    if (!success) {
      response = responsePartnerAPI({
        isEncrypt,
        keySecret,
        responses: responseMessage,
        statusCode: 400,
        responseData: { errors },
        responseCode: "E0003",
      });
      return res.json(response);
    }
    console.log("🚀  body:", body);
    const result = await authService.signOnService(body);
    if (result.status !== 200) {
      response = responsePartnerAPI({
        isEncrypt,
        keySecret,
        responses: responseMessage,
        statusCode: 400,
        responseData: { errors },
        responseCode: "E0001",
      });
      return res.json(response);
    }
    objectHistory.status = 200;
    let response = responsePartnerAPI({
      isEncrypt,
      keySecret,
      responses: responseMessage,
      statusCode: 200,
      responseData: {},
      responseCode: "S0000",
    });
    return res.json(response);
  } catch (error) {
    response = responsePartnerAPI({
      isEncrypt,
      keySecret,
      responses: responseMessage,
      statusCode: 500,
      responseData: { error },
      responseCode: "E0001",
    });
    return res.json(response);
  } finally {
    await insertServiceHistoryLog({
      request: JSON.stringify(objectHistory.request),
      response: JSON.stringify(response),
      status: objectHistory.status,
      type: objectHistory.type,
    });
  }
};
