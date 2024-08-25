const { v4: uuid } = require("uuid");
const moment = require("moment-timezone");
const responseMessage = require("../build-response/responseMessage.json");
const { responsePartnerAPI } = require("../formatBuildAPI/buildResponseParam");
const Encryption = require("../security/Encryption");
const ServiceHistoryLogRepository = require("../../database/repository/ServiceHistoryLogRepository");

const encryption = new Encryption();

const genUUID = () => {
  const UUID = uuid();
  const timestamp = String(Math.round(new Date().getTime() / 1000));
  return UUID.concat(timestamp);
};

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

const validateHeader = (request) => {
  const apiKey = process.env.API_KEY;
  const channel = process.env.CHANNEL_CODE;

  const authHeader = request.headers["authorization"];
  const apiKeyHeader = request.headers["api-key"];
  const channelHeader = request.headers["channel"];

  if (apiKeyHeader !== apiKey)
    return { status: 402, message: "Unauthorized", data: null };
  if (channelHeader !== channel)
    return { status: 402, message: "Unauthorized", data: null };

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return { status: 401, message: "Access Denied", data: null };

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return { status: 403, message: "Invalid Token", data: null };
    return { status: 200, message: "validate pass", data: user };
  });
};

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
    const bodyM = body;
    const resBody = encryption.decrypt256GCM(bodyM.data, key);
    return { success: true, data: JSON.parse(resBody), error: undefined };
  } catch (error) {
    console.log("error ::", error);
    return { success: false, data: { body }, error };
  }
};

const decryptRequestBody = ({ req, isEncrypt, keySecret }) => {
  let response = { status: true, data: null };
  if (process.env.IS_ENCRYPT === "Y") {
    console.log("Decrypt Body ::");
    const {
      success: successDecrypt,
      data: body,
      errors: errDecrypt,
    } = decryptBody(req.body, keySecret);
    if (!successDecrypt) {
      response.data = responsePartnerAPI({
        isEncrypt,
        keySecret,
        responses: responseMessage,
        statusCode: 400,
        responseData: { errors: errDecrypt },
        responseCode: "E0002",
      });
      response.status = false;
      return response;
    }
    response.data = body;
  } else {
    response.data = req.body;
  }
  return response;
};

const insertServiceHistoryLog = async ({ request, response, type, status }) => {
  return ServiceHistoryLogRepository.add({
    request,
    response,
    type,
    status,
    created_on: moment()
      .tz(process.env.TIMEZONE)
      .format(process.env.DATETIMEFORMAT),
    updated_on: moment()
      .tz(process.env.TIMEZONE)
      .format(process.env.DATETIMEFORMAT),
  });
};

module.exports = {
  detectLanguageFromHeaders,
  errorIsItemNotFound,
  validateObjectToSchema,
  allowHeaders,
  decryptBody,
  decryptRequestBody,
  genUUID,
  insertServiceHistoryLog,
  validateHeader,
};
