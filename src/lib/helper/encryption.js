const crypto = require('crypto');

const iv = '0123456789ABCDEF';

process.env.ALG = 'aes-256-cbc';
process.env.HASH_NAME = 'sha256';
const errorMessage = (error) => {
  return {
    errorSecret: true,
    errorCode: 'E0017',
    errorText: error.toString(),
  };
};

const encrypt = (plaintext, key) => {
  try {
    const instance = crypto.createCipheriv(process.env.ALG, key, iv);
    let s_output = instance.update(plaintext, 'utf8', 'hex');
    s_output += instance.final('hex');
    return s_output;
  } catch (error) {
    throw errorMessage(error);
  }
};

const decrypt = (cipherText, key) => {
  try {
    const instance = crypto.createDecipheriv(process.env.ALG, key, iv);
    const s_output = instance.update(cipherText, 'hex', 'utf8');
    const s_final = instance.final('utf8');
    return s_output + s_final;
  } catch (error) {
    throw errorMessage(error);
  }
};

module.exports = {
  encrypt,
  decrypt,
};
