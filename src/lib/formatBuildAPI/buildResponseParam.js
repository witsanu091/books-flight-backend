const Encryption = require("../security/Encryption");
const { respond } = require("../build-response/index");

const encryption = new Encryption();

const responsePartnerAPI = ({
  isEncrypt,
  keySecret,
  responses,
  statusCode,
  responseData,
  responseCode,
}) => {
  const res = respond(responses, statusCode, responseData, responseCode);
  if (isEncrypt === "N" || !responseData) return res;
  res.body = encryption.encrypt256GCM(res.body, keySecret);
  return res;
};

module.exports = { responsePartnerAPI };
