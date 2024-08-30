const moment = require("moment-timezone");
const models = require("../models");

const formatTemplate = process.env.DATETIMEFORMAT || "YYYY-MM-DD HH:mm:ss";
const timeZone = "Asia/Bangkok";

class UserRepository {
  static async add(item) {
    console.log("Create User", item);
    const model = await models;
    const { Users } = model;
    try {
      return Users.create(
        { ...item, created_on: moment().tz(timeZone).format(formatTemplate) },
        {
          raw: true,
        }
      );
    } catch (error) {
      console.log("[Error] Add Users", error);
      throw error;
    }
  }
  static async getAllByKey(where) {
    try {
      const model = await models;
      const { Users } = model;
      const result = await Users.findAll({
        where: where,
        order: [["created_on", "DESC"]],
        raw: true,
      });
      return result;
    } catch (error) {
      console.error("Error Find by key Users ::", error);
      throw error;
    }
  }
  static async getByKey(where) {
    try {
      const model = await models;
      const { Users } = model;
      const result = await Users.findOne({
        where,
      }).then((el) => {
        if (!el) return null;
        return el.get({ plain: true });
      });
      return result;
    } catch (error) {
      console.error("Error Find by key Users ::", error);
      throw error;
    }
  }
}

module.exports = UserRepository;
