const { Op } = require("sequelize");
const models = require("../models");

class AirportRepository {
  static async getAirport(query) {
    const model = await models;
    const { Airport } = model;
    try {
      const results = await Airport.findAll({
        where: {
          [Op.or]: [
            {
              airport_name: {
                [Op.iLike]: `%${query}%`,
              },
            },
            {
              location: {
                [Op.iLike]: `%${query}%`,
              },
            },
          ],
          [Op.and]: [
            {
              enabled: true,
            },
          ],
        },
        limit: 10,
      });
      return results;
    } catch (error) {
      console.log("🚀  AirportRepository  error:", error);
      throw error;
    }
  }
}

module.exports = AirportRepository;
