const {
  responsePartnerAPI,
} = require("../../../lib/formatBuildAPI/buildResponseParam");
const {
  validateObjectToSchema,
  insertServiceHistoryLog,
  validateHeader,
} = require("../../../lib/helper");
const { getBookingSchema } = require("../../../lib/helper/schemas");
const responseMessage = require("../../../lib/build-response/responseMessage.json");
const {
  getBookingService,
} = require("../../services/booking/getBookingService");

exports.getBooking = async (req, res, next) => {
  const isEncrypt = process.env.IS_ENCRYPT;
  const keySecret = process.env.KEY_SECRET;
  let response;
  let objectHistory = {
    type: "Get Booking",
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
  const query = req.query.book_no;
  if (!query) {
    response = responsePartnerAPI({
      isEncrypt,
      keySecret,
      responses: responseMessage,
      statusCode: 400,
      responseData: { errors },
      responseCode: "E0000",
    });
    return res.json(response);
  }

  try {
    let bodyParam = { user_id: dataUser.user_id, book_no: query };
    const {
      success,
      data: body,
      errors,
    } = validateObjectToSchema(bodyParam, getBookingSchema);

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
    const { status, data } = await getBookingService(body);
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