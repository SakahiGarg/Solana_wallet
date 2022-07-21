const mongoose = require('mongoose');
const logger = require('../services/logger');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};

module.exports = connectDb;