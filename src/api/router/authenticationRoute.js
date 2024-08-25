const express = require("express");
const signOnController = require("../controllers/authentication/signOnController");
const signInController = require("../controllers/authentication/signInController");

const router = express.Router();

router.post("/sign-on", signOnController.signOn);
router.post("/sign-in", signInController.signIn);

module.exports = router;
