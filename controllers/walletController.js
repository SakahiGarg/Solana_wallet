const walletDetails = require("../models/walletModel");
const { generateToken } = require("../services/walletServices");
const { createAccount } = require("../services/accountServices");
const {
  AlreadyOccupiedError,
} = require("../handler/error/AlreadyOccupiedError");
const { InvalidInputError } = require("../handler/error/InvalidInputError");
const logger = require("../services/logger");

class WalletController {
  async createNewWalletUser(req, res) {
    const { username } = req.body;
    logger.debug("200: get data from body of request");
    if (!username) {
      throw new InvalidInputError("username feild is missing");
    }
    const isUser = await walletDetails.findOne({ username });
    logger.info("200:checked user is already registered or not");
    if (isUser) {
      throw new AlreadyOccupiedError(
        "This wallet user identity has already registered"
      );
    }
    logger.info(`Create new wallet entity`);
    const token = await generateToken(username);
    const wallet = await walletDetails.create({
      username,
      authorizedToken: token,
    });
    let account = await createAccount(wallet._id, "Main Account");
    res.json({
      wallet,
      account,
    });
  }
}

module.exports = WalletController;
