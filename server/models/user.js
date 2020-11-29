const mongoose = require("mongoose");
const { objectID } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      require: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: String,
    // wishList: [{type: objectID, ref:"Product"},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
