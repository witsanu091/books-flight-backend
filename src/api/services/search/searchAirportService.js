const AirportRepository = require("../../../database/repository/airportRepository");

const searchAirportService = async (query) => {
  console.time("🚀 ~ searchAirportService ~ time");
  try {
    const result = await AirportRepository.getAirport(query);
    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ searchAirportService ~ error:", error);
    throw { status: 200, message: error };
  } finally {
    console.timeEnd("🚀 ~ searchAirportService ~ time");
  }
};

module.exports = { searchAirportService };
