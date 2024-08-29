const express = require("express");
const { signOn } = require("../controllers/authentication/signOnController");
const { signIn } = require("../controllers/authentication/signInController");

const router = express.Router();

router.post("/sign-on", signOn);
router.post("/sign-in", signIn);

module.exports = router;
