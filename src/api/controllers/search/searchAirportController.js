const {
  responsePartnerAPI,
} = require("../../../lib/formatBuildAPI/buildResponseParam");
const { insertServiceHistoryLog } = require("../../../lib/helper");
const responseMessage = require("../../../lib/build-response/responseMessage.json");
const {
  searchAirportService,
} = require("../../services/search/searchAirportService");

exports.searchAirport = async (req, res, next) => {
  const query = req.query.q;
  if (!query) {
    return res.json([]);
  }
  try {
    const { status, data } = await searchAirportService(query);
    if (status !== 200) {
      return res.json([]);
    }
    return res.json(data);
  } catch (error) {
    return res.json([]);
  }
};
