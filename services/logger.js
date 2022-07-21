const winston = require('winston');

const { format } = winston;
const { transports } = winston;

const config = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    info: 4,
    verbose: 5,
    silly: 6,
    custom: 7,
  },
  colors: {
    error: 'red',
    debug: 'blue',
    warn: 'yellow',
    data: 'grey',
    info: 'green',
    verbose: 'cyan',
    silly: 'magenta',
    custom: 'yellow',
  },
};

winston.addColors(config.colors);

const dynamicContent = (info) => ({ ...info, message: info.message });

const logger = winston.createLogger({
  levels: config.levels,
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format(dynamicContent)(),
    format.printf((info) => `${info.level}: [ ${info.timestamp} ] ${info.message}`),
  ),
});

if (process.env.NODE_ENV === 'development') {
  logger.add(
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf((info) => `${info.level}: [ ${info.timestamp} ] ${info.message}`),
      ),
    }),
  );
} else {
  logger.add(
    new transports.File({
      level: 'error',
      dirname: 'Logs',
      filename: 'info.log',
    }),
  );
  logger.add(
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.printf((info) => `${info.level}: [ ${info.timestamp} ] ${info.message}`),
      ),
    }),
  );
}

module.exports = logger;