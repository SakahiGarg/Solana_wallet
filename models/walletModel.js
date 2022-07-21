const mongoose = require("mongoose");

const walletSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Wallet Schema: Please provide username"],
    },
    authorizedToken: {
      type: String,
      required: [true, "Wallet Schema: please provide bearer token"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("walletDetails", walletSchema);
