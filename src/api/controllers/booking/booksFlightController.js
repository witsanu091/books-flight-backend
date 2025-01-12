const {
  responsePartnerAPI,
} = require("../../../lib/formatBuildAPI/buildResponseParam");
const {
  decryptRequestBody,
  validateObjectToSchema,
  insertServiceHistoryLog,
  validateHeader,
} = require("../../../lib/helper");
const { bookingSchema } = require("../../../lib/helper/schemas");
const responseMessage = require("../../../lib/build-response/responseMessage.json");
const {
  bookingFlightService,
} = require("../../services/booking/booksFlightService");

exports.bookingFlight = async (req, res, next) => {
  const isEncrypt = process.env.IS_ENCRYPT;
  const keySecret = process.env.KEY_SECRET;
  let response;
  let objectHistory = {
    type: "Booking Flight",
    request: req.body,
    response: response,
    status: "400",
  };
  const {
    status: validateHeaderStatus,
    data: dataUser,
    message,
  } = validateHeader(req);
  if (validateHeaderStatus !== 200) {
    return res.json({ message });
  }
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
    } = validateObjectToSchema(bodyDecrypt, bookingSchema);

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
    const { status, data } = await bookingFlightService(body);
    if (status !== 200) {
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
      responseData: data,
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
