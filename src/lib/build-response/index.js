// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require("moment-timezone");

const formatTemplate = process.env.DATETIMEFORMAT || "YYYY-MM-DD HH:mm:ss";
const timeZone = "Asia/Bangkok";

const respond = (responses, statusCode, responseData, responseCode) => {
  const response = responses[responseCode];

  if (!response)
    throw new Error(`Invalid error or success code "${responseCode}"`);

  const formatResponseDate = moment().tz(timeZone).format(formatTemplate);

  return {
    isBase64Encoded: false,
    statusCode,
    body: {
      // ...responses[responseCode][language.toUpperCase()],
      ...responses[responseCode],
      response_date_time: formatResponseDate,
      response_code: responseCode,
      response_data: responseData,
    },
  };
};

module.exports = { respond };
