const models = require("../models");

class UserRepository {
  static async add(item) {
    console.log("Create User", item);
    const model = await models;
    const { User } = model;
    try {
      return await User.create(item, {
        returning: true,
        raw: true,
      });
    } catch (error) {
      console.log("[Error] Add Otp History", error);
      throw error;
    }
  }
  static async getAllByKey(where) {
    try {
      const model = await models;
      const { User } = model;
      const result = await User.findAll({
        where: where,
        order: [["created_on", "DESC"]],
        raw: true,
      });
      return result;
    } catch (error) {
      console.error("Error Find by key User ::", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
