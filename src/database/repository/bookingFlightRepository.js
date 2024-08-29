const models = require("../models");

class BookingFlightRepository {
  static async add(item) {
    console.log("Create BookingFlight", item);
    const model = await models;
    const { Books } = model;
    try {
      return Books.create(item, {
        raw: true,
      });
    } catch (error) {
      console.log("[Error] Add BookingFlight", error);
      throw error;
    }
  }
  static async getAllByKey(where) {
    try {
      const model = await models;
      const { Books } = model;
      const result = await Books.findAll({
        where: where,
        order: [["created_on", "DESC"]],
        raw: true,
      });
      return result;
    } catch (error) {
      console.error("Error Find by key BookingFlight ::", error);
      throw error;
    }
  }
  static async getByKey(where) {
    try {
      const model = await models;
      const { Books } = model;
      const result = await Books.findOne({
        where,
      }).then((el) => {
        if (!el) return null;
        return el.get({ plain: true });
      });
      return result;
    } catch (error) {
      console.error("Error Find by key BookingFlight ::", error);
      throw error;
    }
  }
}

module.exports = BookingFlightRepository;
