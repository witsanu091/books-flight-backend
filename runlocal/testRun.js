const { encryptCBC256 } = require("../src/database/tools/encryptionField");

process.env.ENCRYPT_KEY = "";

(async () => {
  let text = "YlGcF4IduRUX7gK9rCrdOYOGjKpR/EwH4l3aal8rPUk=";
  const result = encryptCBC256(text);
  console.log("🚀  result:", result);
})();
