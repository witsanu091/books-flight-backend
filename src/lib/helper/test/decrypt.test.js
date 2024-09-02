const { decryptBody } = require("../decrypt");

const Encryption = require("../../security/Encryption");

describe("Call Api Service", () => {
  describe("Case success", () => {
    test("should returned sucess call RequestBody", async () => {
      const expected = {
        user_type: "staff",
        user_valid: true,
      };
      const event = {
        body: JSON.stringify(expected),
      };
      const partnerSecretValueFN = "xxx";
      const isEncrypt = "Y";
      const language = "en";

      process.env.IS_ENCRYPT = "N";
      const received = await decryptBody({
        event,
        partnerSecretValueFN,
        isEncrypt,
        language,
      });
      expect(received.status).toEqual(true);
      expect(received.data).toEqual(expected);
    });

    test("should returned sucess call decryptRequestBody", async () => {
      const encryption = new Encryption();
      const expected = {
        user_type: "staff",
        user_valid: true,
      };
      const event = {
        body: encryption.encrypt256ecb(
          JSON.stringify(expected),
          "15bef7d9b753afe6d0236d5f92b2b7d7"
        ),
      };
      const partnerSecretValueFN = { AES: "15bef7d9b753afe6d0236d5f92b2b7d7" };
      const language = "en";
      process.env.IS_ENCRYPT = "Y";
      const received = await decryptBody({
        event,
        partnerSecretValueFN,
        language,
      });
      expect(received.status).toEqual(true);
      expect(received.data).toEqual(expected);
    });
  });
});
