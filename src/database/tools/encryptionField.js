const dotenv = require("dotenv");
const Encryption = require("../../lib/security/Encryption");

const encryption = new Encryption();

dotenv.config();

const encryptTextKey = process.env.ENCRYPT_KEY;

const encryptCBC256 = (txt) => {
  try {
    if (!txt) return txt;
    return encryption.encrypt256cbc(txt, encryptTextKey);
  } catch (error) {
    return txt;
  }
};

const decryptCBC256 = (txt) => {
  try {
    if (!txt) return txt;
    return encryption.decrypt256cbc(txt, encryptTextKey);
  } catch (error) {
    return txt;
  }
};

module.exports = {
  encryptCBC256,
  decryptCBC256,
};
