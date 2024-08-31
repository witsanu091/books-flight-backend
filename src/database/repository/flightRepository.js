const { QueryTypes } = require("sequelize");
const models = require("../models");

class FlightRepository {
  static async getAllFlight() {
    try {
      const model = await models;
      const { sequelize } = model;

      const result = await sequelize.query(
        `SELECT 
          f.flight_id,
          f.flight_date,
          a.airline_name,
          a.airline_number,
          at.airport_name AS takeoff_airport,
          at.airport_id AS takeoff_airport_id,
          al.airport_name AS landing_airport,
          s.round_flight,
          s.time_gate,
          s.time_take_off,
          s.time_landing,
          f.created_on,
          f.updated_on,
          f.enabled,
          s.hour_travel 
      FROM 
        flight f
      LEFT JOIN 
        airline a ON f.airline_id = a.airline_id
      LEFT JOIN 
        airport at ON f.airport_take_off_id = at.airport_id
      LEFT JOIN 
        airport al ON f.airport_landing_id = al.airport_id
      LEFT JOIN 
        schedule s ON f.schedule_id = s.schedule_id
      ORDER BY 
        RANDOM()
      LIMIT 6;`,
        {
          type: QueryTypes.SELECT,
          raw: true,
        }
      );

      return result;
    } catch (error) {
      console.log("🚀  checkTablePartition  error:", error);
    }
  }
  static async getFlightByKey(where) {
    try {
      const { airport_take_off, airport_landing, flight_date } = where;
      let additionalConditions = [];

      if (airport_take_off) {
        additionalConditions.push(`at.airport_id = :airport_take_off`);
      }
      if (airport_landing) {
        additionalConditions.push(`al.airport_id = :airport_landing`);
      }
      if (flight_date) {
        additionalConditions.push(`f.flight_date = :flight_date`);
      }
      additionalConditions.push(`f.enabled = true`);

      const whereClause = additionalConditions.length
        ? `WHERE ${additionalConditions.join(" AND ")}`
        : "";

      const model = await models;
      const { sequelize } = model;

      const query = `
      SELECT 
        f.flight_id,
        f.flight_date,
        a.airline_name,
        a.airline_number,
        at.airport_name AS takeoff_airport,
        at.airport_id AS takeoff_airport_id,
        al.airport_name AS landing_airport,
        s.round_flight,
        s.time_gate,
        s.time_take_off,
        s.time_landing,
        f.created_on,
        f.updated_on,
        f.enabled,
        s.hour_travel 
      FROM 
        flight f
      LEFT JOIN 
        airline a ON f.airline_id = a.airline_id
      LEFT JOIN 
        airport at ON f.airport_take_off_id = at.airport_id
      LEFT JOIN 
        airport al ON f.airport_landing_id = al.airport_id
      LEFT JOIN 
        schedule s ON f.schedule_id = s.schedule_id
        ${whereClause}
      ORDER BY 
        f.flight_date ASC;
      `;

      const result = await sequelize.query(query, {
        replacements: {
          airport_take_off,
          airport_landing,
          flight_date,
        },
        type: QueryTypes.SELECT,
        raw: true,
      });
      console.log("🚀  flightRepository  result:", result);
      return result;
    } catch (error) {
      console.error("🚀  flightRepository  error:", error);
    }
  }
}

module.exports = FlightRepository;
