const {
  responsePartnerAPI,
} = require("../../../lib/formatBuildAPI/buildResponseParam");
const responseMessage = require("../../../lib/build-response/responseMessage.json");
const {
  searchFlightAllService,
} = require("../../services/search/searchFlightAllService");

exports.searchFlightAll = async (req, res, next) => {
  const isEncrypt = process.env.IS_ENCRYPT;
  const keySecret = process.env.KEY_SECRET;
  let response;
  let objectHistory = {
    type: "Search Flight All",
    request: req.body,
    response: {},
    status: "400",
  };
  try {
    const { status, data } = await searchFlightAllService();
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
    response = responsePartnerAPI({
      isEncrypt,
      keySecret,
      responses: responseMessage,
      statusCode: 200,
      responseData: data,
      responseCode: "S0000",
    });
    objectHistory.status = 200;
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
  }
};
