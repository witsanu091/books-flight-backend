const express = require("express");
const {
  searchAirport,
} = require("../controllers/search/searchAirportController");
const {
  searchFlight,
} = require("../controllers/search/searchFlightController");
const {
  searchFlightAll,
} = require("../controllers/search/searchFlightAllController");

const router = express.Router();

router.post("/search-flight", searchFlight);
router.get("/search-flight-all", searchFlightAll);
router.get("/search-airport", searchAirport);

module.exports = router;
