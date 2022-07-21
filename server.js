const express = require('express');
require("express-async-errors");
require("express-async-handler");
require('dotenv').config();
const cors = require('cors');
const { serverLog } = require('./middleware/loggingMiddleware');
const connectDb = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./services/logger');

const port = process.env.PORT;

/**
 * ? This function connects db to server
 */
connectDb();
/**
 * ? Routing and intialization starts here
 */

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('./public'));

app.use(serverLog);
app.use('/api/wallet', require('./routes/walletRoute'));
app.use('/api/account', require('./routes/accountRoute'));

/**
 * ! Error handling middleware
 */
app.use(errorHandler);

app.listen(port, () => logger.info(`server started at http://localhost:${port}`));