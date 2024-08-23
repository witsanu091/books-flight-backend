const express = require("express");
const userProfileController = require("../controllers/profile.controller");
const router = express.Router();

router.get("/user/profile", userProfileController.getUserProfile);

module.exports = router;
