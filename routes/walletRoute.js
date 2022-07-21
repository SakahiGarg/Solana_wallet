const express = require('express');
const walletController = require('../controllers/walletController');
const router = express.Router();

router.post("/", new walletController().createNewWalletUser);

module.exports = router;