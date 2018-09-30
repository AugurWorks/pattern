import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as log4js from 'log4js';

import SingleDataRequest from './model/SingleDataRequest';

import dataRetrievalService from './service/DataRetrievalService';
import matchingService from './service/MatchingService';

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'info'
    }
  }
} as log4js.Configuration);
const logger = log4js.getLogger();
logger.level = 'info';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(log4js.connectLogger(logger, {
  level: 'debug'
}));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.get('/data', async (req, res) => {
  const symbol = req.query.symbol;
  const startDate = new Date(Date.parse(req.query.startDate));
  const endDate = new Date(Date.parse(req.query.endDate));
  const unit = req.query.unit;
  const singleDataRequest = new SingleDataRequest(symbol, startDate, endDate, unit);
  const dataSetValues = await dataRetrievalService.getDataSetValues(singleDataRequest);
  res.json(dataSetValues);
});

app.get('/match', async (req, res) => {
  const symbol = req.query.symbol;
  const startDate = new Date(Date.parse(req.query.startDate));
  const endDate = new Date(Date.parse(req.query.endDate));
  const unit = req.query.unit;
  const interval = parseInt(req.query.interval, 10);
  const singleDataRequest = new SingleDataRequest(symbol, startDate, endDate, unit);
  const dataSetValues = await dataRetrievalService.getDataSetValues(singleDataRequest);
  const matchingResult = matchingService.getDataSetValues(dataSetValues, interval);
  res.json(matchingResult);
});

app.listen(3000, () => {
  logger.info('Started app on port 3000');
});
