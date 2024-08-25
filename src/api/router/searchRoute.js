const express = require("express");
const searchFlightController = require("../controllers/search/searchFlightController");

const router = express.Router();

router.post("/search-flight", searchFlightController.searchFlight);

module.exports = router;
