const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
    }),
  ],
  prettyPrint: true,
  colorize: true,
});

const serverLog = async (req, res, next) => {
  logger.info(`${req.method} ${req.path} `);

  next();
};
module.exports = { serverLog };