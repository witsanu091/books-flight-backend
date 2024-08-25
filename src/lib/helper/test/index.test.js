const { schemaSearchSales } = require("../schemas");

const {
  detectLanguageFromHeaders,
  errorIsItemNotFound,
  validateObjectToSchema,
  allowHeaders,
} = require("../index");

describe("Build Response", () => {
  describe("Case sucess", () => {
    beforeEach(() => {});

    afterEach(() => {});
    test("should returned sucess detect language ", async () => {
      expect(detectLanguageFromHeaders()).toEqual("EN");
      expect(detectLanguageFromHeaders({ "X-Api-Language": "en" })).toEqual(
        "EN"
      );
      expect(detectLanguageFromHeaders({ "X-Api-Language": "th" })).toEqual(
        "TH"
      );
    });
    test("should returned sucess errorIsItemNotFound ", async () => {
      expect(errorIsItemNotFound(new Error("error"))).toEqual(false);
      expect(errorIsItemNotFound({ name: "ItemNotFoundException" })).toEqual(
        true
      );
    });
    test("should returned sucess validate object ", async () => {
      const objData = { user_name: "0910000000", type: "all" };
      const expected = {
        success: true,
        data: { user_name: "0910000000", type: "all" },
      };
      const received = validateObjectToSchema(objData, schemaSearchSales);
      expect(received).toEqual(expected);
    });
    test("should returned sucess allow header ", async () => {
      const received = allowHeaders({ "X-Api-Language": "en" });
      const expected = {
        "X-Api-Language": "en",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods":
          "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      };
      expect(received).toEqual(expected);
    });
  });
});
