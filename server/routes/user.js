const express = require("express");

const router = express.Router();

// thinking about Express as a request-response handler
router.get("/user", (req, res) => {
  // send some hard coded data
  res.json({
    data: "hey you hit users API endpoint",
  });
});

module.exports = router;
