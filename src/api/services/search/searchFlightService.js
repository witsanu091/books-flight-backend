const FlightRepository = require("../../../database/repository/FlightRepository");

const searchFlightService = async (body) => {
  console.time("🚀 ~ searchFlightService ~ time");
  try {
    const result = await FlightRepository.getFlightByKey(body);
    console.log("🚀  result:", result);
    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ searchFlightService ~ error:", error);
    throw { status: 200, message: error };
  } finally {
    console.timeEnd("🚀 ~ searchFlightService ~ time");
  }
};

module.exports = { searchFlightService };
