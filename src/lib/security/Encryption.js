const crypto = require("crypto");
const jwt = require("jsonwebtoken");

class Encryption {
  constructor() {
    this.sha256 = "sha256";
    this.aes256ecb = "aes-256-ecb";
    this.aes256gcm = "aes-256-gcm";
    this.aes256cbc = "aes-256-cbc";
    this.sha256 = "sha256";
    this.ivLen = 12;
  }

  HmacSHA256(key, text) {
    return crypto.createHmac(this.sha256, key).update(text).digest();
  }

  HmacSHA256ToHex(key, text) {
    return crypto.createHmac(this.sha256, key).update(text).digest("hex");
  }

  encrypt256ecb(plaintext, key) {
    const cipher = crypto.createCipheriv(this.aes256ecb, key, "");
    let ciphertext = cipher.update(plaintext, "utf8", "hex");
    ciphertext += cipher.final("hex");
    return ciphertext;
  }

  encrypt256ecbBase64(plaintext, key) {
    const cipher = crypto.createCipheriv(this.aes256ecb, key, "");
    let ciphertext = cipher.update(plaintext, "utf8", "base64");
    ciphertext += cipher.final("base64");
    return ciphertext;
  }

  decrypt256ecb(ciphertext, key) {
    const decipher = crypto.createDecipheriv(this.aes256ecb, key, "");
    let plaintext = decipher.update(ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8");
    return plaintext;
  }

  encrypt256cbc(plaintext, key) {
    const iv = "0123456789ABCDEF";
    const keyAes = Buffer.from(key, "base64");
    const cipher = crypto.createCipheriv(this.aes256cbc, keyAes, iv);
    let ciphertext = cipher.update(plaintext, "utf8", "hex");
    ciphertext += cipher.final("hex");
    return ciphertext;
  }

  decrypt256cbc(ciphertext, key) {
    const iv = "0123456789ABCDEF";
    const keyAes = Buffer.from(key, "base64");
    const decipher = crypto.createDecipheriv(this.aes256cbc, keyAes, iv);
    let plaintext = decipher.update(ciphertext, "hex", "utf8");
    plaintext += decipher.final("utf8");
    return plaintext;
  }

  /**
   * Encrypts text by given key
   * @param String text to encrypt
   * @param String key using 32 byte key length
   * @returns String encrypted text, base64 encoded
   */
  encrypt256GCM(text, key) {
    // length tag iv
    const tag_length = 128;

    // random initialization vector
    const iv = crypto.randomBytes(this.ivLen);

    // Buffer base64 AES Key
    const encryptKeyDecode = Buffer.from(key, "base64");

    // AES 256 GCM Mode
    const cipher = crypto.createCipheriv(
      this.aes256gcm,
      encryptKeyDecode,
      iv,
      tag_length
    );

    // encrypt the given text
    const encrypted = Buffer.concat([
      cipher.update(text, "utf8"),
      cipher.final(),
    ]);

    // extract the auth tag
    const tag = cipher.getAuthTag();

    // generate output
    return Buffer.concat([iv, encrypted, tag]).toString("base64");
  }

  /**
   * Decrypts text by given key
   * @param String base64 encoded input data
   * @param String key using 32 byte key length
   * @returns String decrypted (original) text
   */
  decrypt256GCM(encryptData, key) {
    console.log("encryptData, key ::", encryptData, key);
    // Buffer base64 AES Key
    const encryptKeyDecode = Buffer.from(key, "base64");

    // base64 decoding
    const bData = Buffer.from(encryptData, "base64");

    // convert data to buffers
    const iv = bData.slice(0, this.ivLen);
    const tag = bData.slice(bData.length - 16);
    const text = bData.slice(12, bData.length - 16);

    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv(
      this.aes256gcm,
      encryptKeyDecode,
      iv
    );
    decipher.setAuthTag(tag);

    // encrypt the given text
    const decrypted =
      decipher.update(text, "binary", "utf8") + decipher.final("utf8");

    return decrypted;
  }

  hashSha256(txt) {
    const hash = crypto.createHash(this.sha256);
    return hash.update(txt).digest("base64");
  }
}

module.exports = Encryption;
