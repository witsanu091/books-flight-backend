const FlightRepository = require("../../../database/repository/FlightRepository");

const searchFlightAllService = async () => {
  console.time("🚀 ~ searchFlightAllService ~ time");
  try {
    const result = await FlightRepository.getAllFlight();
    console.log("🚀  result:", result);
    return { status: 200, message: "success", data: result };
  } catch (error) {
    console.error("🚀 ~ searchFlightAllService ~ error:", error);
    throw { status: 200, message: error };
  } finally {
    console.timeEnd("🚀 ~ searchFlightAllService ~ time");
  }
};

module.exports = { searchFlightAllService };
