const models = require("../models");

class ServiceHistoryLogRepository {
  static async add(item) {
    console.log(
      "🚀 ~ file: ServiceHistoryLogRepository.js:5 ~ ServiceHistoryLogRepository ~ add ~ item:",
      item
    );
    const model = await models;
    const { ServiceHistoryLog } = model;
    try {
      return await ServiceHistoryLog.create(item, {
        returning: true,
        raw: true,
      });
    } catch (error) {
      console.log("[Error] Add Otp History", error);
      throw error;
    }
  }
}

module.exports = ServiceHistoryLogRepository;
