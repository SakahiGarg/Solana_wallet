const createConnection = require("../config/solanaNetwork");
const accountDetails = require("../models/accountModel");
const { Keypair, LAMPORTS_PER_SOL } = require("@solana/web3.js");
const web3 = require("@solana/web3.js");
const logger = require("./logger");
const { AlreadyOccupiedError } = require("../handler/error/AlreadyOccupiedError");
const createAccount = async(id, name) => {
  const keypair = Keypair.generate();
  let account=await accountDetails.findOne({owner:id,name});
  console.log(account,"account");
  if(account){
    throw new AlreadyOccupiedError("Account with the same name exist");
  }
  account =await accountDetails.create({
    owner: id,
    name,
    pubKey: keypair.publicKey.toBase58(),
    secretKey: keypair.secretKey.toString(),
    balance: 0,
  });
  return account;
};
const requestAirdrop = async (publicKey) => {
  console.log(publicKey);
  const connection = createConnection();
  const pubkey = new web3.PublicKey(publicKey);
  console.log(pubkey, "pubkey");
  const airdropSignature = await connection.requestAirdrop(
    pubkey,
    LAMPORTS_PER_SOL
  );

  const signature = await connection.confirmTransaction(airdropSignature);

  const newBalance = await getBalance(pubkey);
  console.log(newBalance);
  let account = await accountDetails.findOneAndUpdate(
    { pubKey: publicKey.toString() },
    {
      balance: newBalance,
    }
  );
  account = await accountDetails.findOne({pubKey: publicKey.toString() });
  logger.info(`account searching`);
  return account;
};
const getBalance = async (publicKey) => {
  console.log(publicKey);
  const connection = createConnection();

  const lamports = await connection.getBalance(publicKey).catch((err) => {
    console.error(`Error: ${err}`);
  });

  return lamports / LAMPORTS_PER_SOL;
};

const accountBalance = async (pubkey) => {
  const account = await accountDetails.findOne({ pubKey: pubkey.toString() });
  console.log(account);
  return account;
};

module.exports = { createAccount, requestAirdrop, accountBalance };
