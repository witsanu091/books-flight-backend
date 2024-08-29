const express = require("express");
const {
  bookingFlight,
} = require("../controllers/booking/booksFlightController");
const { getBooking } = require("../controllers/booking/getBookController");

const router = express.Router();

router.post("/booking-flight", bookingFlight);
router.get("/booking-detail", getBooking);

module.exports = router;
