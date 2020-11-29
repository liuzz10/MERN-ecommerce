// When client .post /api/create-or-update-user

const express = require("express");

const router = express.Router();

// import middlewares
const { authCheck } = require("../middlewares/auth");

// thinking about Express as a request-response handler

// import: by desctructing
const { createOrUpdateUser } = require("../controllers/auth");

// controller (if authCheck works, works on createOrUpdateUser)
router.post("/create-or-update-user", authCheck, createOrUpdateUser);

module.exports = router;
