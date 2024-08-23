const express = require("express");
const authenticationController = require("../controllers/authentication.controller");
const router = express.Router();

router.post("/auth/sign-on", authenticationController.signOn);
router.get("/auth/sign-in", authenticationController.signIn);

module.exports = router;
