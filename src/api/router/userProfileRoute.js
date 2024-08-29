const express = require("express");
const { getUser } = require("../controllers/profile/getUserProfileController");

const router = express.Router();

router.get("/user-profile", getUser);

module.exports = router;
