const express = require("express");
const authenticationController = require("../controllers/authentication.controller");
const router = express.Router();

router.get("/auth/sign-on", authenticationController.signOn);
router.get("/auth/sign-in", authenticationController.getAllByKey);

module.exports = router;
