// When client .post /api/category

const express = require("express");
const router = express.Router();

// import middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// thinking about Express as a request-response handler

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

// controller (if authCheck, adminCheck works, proceed)
router.post("/category", authCheck, adminCheck, create);
router.get("/categories", list);
router.get("/category/:slug", read);
router.put("/category/:slug", authCheck, adminCheck, update);
router.delete("/category/:slug", authCheck, adminCheck, remove);

module.exports = router;
