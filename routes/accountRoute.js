const express = require('express');
const AccountController = require('../controllers/accountController');
const { authorizedRoute } = require('../middleware/authorizedMiddleware');
const router = express.Router();

router.post("/createAccount", authorizedRoute, new AccountController().createNewAccount);
router.post("/requestAirdrop", new AccountController().requestAirdrop);
router.get("/balance/:publicKey",new AccountController().getAccountBalance);

module.exports = router;