const express = require("express");

const router = express.Router();

// thinking about Express as a request-response handler
router.get("/create-or-update-user", (req, res) => {
  // send some hard coded data
  res.json({
    data: "hey you hit create-or-update-user API endpoint",
  });
});

module.exports = router;
