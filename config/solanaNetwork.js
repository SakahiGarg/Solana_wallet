const { Connection, clusterApiUrl } = require("@solana/web3.js");

const createConnection = () => {
  return new Connection(clusterApiUrl("devnet"));
};

module.exports = createConnection;
