const mongoose = require("mongoose");

const accountSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "walletDetails",
    },
    name: {
      type:String,
      required: [true, "Acount Schema: Please provide account name"],
    },
    pubKey:{
        type:String,
        required: [true, "Acount Schema: Please provide account public key"],
    },
    secretKey:{
        type: String,
      required: [true, "Acount Schema: Please provide account key pair"],
    },
    balance: {
      type: Number,
      required: [true, "Account Schema: Please provide account balance"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("accountDetails", accountSchema);
