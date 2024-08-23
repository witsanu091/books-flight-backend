const moment = require("moment-timezone");

const { v4: uuid } = require("uuid");

const responseMessage = require("../build-response/responseMessage.json");

const { responsePartnerAPI } = require("../formatBuildAPI/buildResponseParam");

const Encryption = require("../security/Encryption");

const encryption = new Encryption();

const formatTemplate = "YYYY-MM-DD[T]HH:mm:ss";
const timeZone = process.env.TIMEZONE || "Asia/Bangkok";

const validateObjectToSchema = (object, schema) => {
  const { success, data, error } = schema.safeParse(object);

  if (!success)
    return {
      success,
      errors: error.issues,
    };

  return { success, data };
};

const detectLanguageFromHeaders = (headers) => {
  const language =
    headers && headers["X-Api-Language"] ? headers["X-Api-Language"] : "EN";

  return language ? language.toUpperCase() : "EN";
};

const errorIsItemNotFound = (error) => error.name === "ItemNotFoundException";

const allowHeaders = (headers = {}) => {
  const origin = "*";
  return {
    ...headers,
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": true,
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  };
};
const decryptBody = (body, key) => {
  try {
    const bodyM = JSON.parse(body);
    const resBody = encryption.decrypt256GCM(bodyM.data, key);
    return { success: true, data: JSON.parse(resBody), error: undefined };
  } catch (error) {
    console.log("error ::", error);
    return { success: false, data: { body }, error };
  }
};

const decryptRequestBody = ({ event, isEncrypt, key_secret }) => {
  let response = { status: true, data: null };
  if (process.env.IS_ENCRYPT === "Y") {
    console.log("Decrypt Body ::");
    const {
      success: successDecrypt,
      data: body,
      errors: errDecrypt,
    } = decryptBody(event.body, key_secret);
    if (!successDecrypt) {
      response.data = responsePartnerAPI({
        isEncrypt,
        responses: responseMessage,
        statusCode: 400,
        responseData: { errors: errDecrypt },
        responseCode: "E9002",
      });
      response.status = false;
      return response;
    }
    response.data = body;
  } else {
    response.data = JSON.parse(event.body);
  }
  return response;
};

module.exports = {
  detectLanguageFromHeaders,
  errorIsItemNotFound,
  validateObjectToSchema,
  allowHeaders,
  decryptBody,
  decryptRequestBody,
};
