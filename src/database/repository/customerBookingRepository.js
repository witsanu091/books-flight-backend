const { Op } = require("sequelize");
const models = require("../models");

class CustomerBookingRepository {
  static async add(item) {
    console.log("Create CustomerBooking", item);
    const model = await models;
    const { CustomerBooking } = model;
    try {
      const result = await CustomerBooking.create(item, {
        raw: true,
        returning: true,
      }).then((el) => {
        if (!el) return null;
        return el.get({ plain: true });
      });
      return result;
    } catch (error) {
      console.log("[Error] Add CustomerBooking", error);
      throw error;
    }
  }
  static async addCustomerBulk(item) {
    console.log("Create addCustomerBulk", item);
    const model = await models;
    const { CustomerBooking } = model;
    try {
      return CustomerBooking.bulkCreate(item, {
        raw: true,
        returning: true,
      }).then((el) => {
        if (!el) return null;
        return el.get({ plain: true });
      });
    } catch (error) {
      console.log("[Error] Add addCustomerBulk", error);
      throw error;
    }
  }
  static async getAllByKey(where) {
    try {
      const model = await models;
      const { CustomerBooking } = model;
      const result = await CustomerBooking.findAll({
        where: where,
        order: [["created_on", "DESC"]],
        raw: true,
      });
      return result;
    } catch (error) {
      console.error("Error Find by key CustomerBooking ::", error);
      throw error;
    }
  }
  static async getByKey(where) {
    try {
      const model = await models;
      const { CustomerBooking } = model;
      const result = await CustomerBooking.findOne({
        where,
      }).then((el) => {
        if (!el) return null;
        return el.get({ plain: true });
      });
      return result;
    } catch (error) {
      console.error("Error Find by key CustomerBooking ::", error);
      throw error;
    }
  }
  static async getByKeyMany(where) {
    try {
      const model = await models;
      const { CustomerBooking } = model;
      const result = await CustomerBooking.findAll({
        where: {
          [Op.and]: {
            user_id: where.user_id,
          },
          [Op.and]: {
            customer_id: {
              [Op.in]: where.customer_id,
            },
          },
          enabled: true,
        },
      });

      if (!result || result.length === 0) return null;

      return result.map((el) => el.get({ plain: true }));
    } catch (error) {
      console.error("Error Find by key CustomerBooking ::", error);
      throw error;
    }
  }
}

module.exports = CustomerBookingRepository;
