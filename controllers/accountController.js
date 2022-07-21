const {
  createAccount,
  requestAirdrop,
  accountBalance,
} = require("../services/accountServices");
const { InvalidInputError } = require("../handler/error/InvalidInputError");
const {NotFoundError} =require("../handler/error/NotFoundError");
const logger = require("../services/logger");
class AccountController {
  async createNewAccount(req, res) {
    const name=req.body.name;
    logger.debug("200: get data from body of request");
    if (!name) {
      throw new InvalidInputError("name feild is missing");
    }
    const walletID = req.wallet._id;
    let account = await createAccount(walletID,name);
    res.json({
      account,
    });
  }
  async requestAirdrop(req, res) {
    const {publicKey}=req.body;
    if (!publicKey) {
      throw new InvalidInputError("publickey feild is missing");
    }
    logger.debug("200: get data from body of request");
    let account = await requestAirdrop(publicKey);
    if(!account){
      throw new NotFoundError("This account does not exist");
    }
    res.json({
      account,
    });
  }
  async getAccountBalance(req, res) {
    if (!req.params.publicKey) {
      throw new InvalidInputError("publickey feild is missing");
    }
    let balance = await accountBalance(req.params.publicKey);
    if(!balance){
      throw new NotFoundError("This account does not exist");
    }
    res.json({"balance":balance});
  }
}

module.exports = AccountController;
