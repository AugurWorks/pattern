import * as express from 'express';
import * as log4js from 'log4js';

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
app.use(log4js.connectLogger(logger, {
  level: 'debug'
}));

app.get('/', (req, res) => {
  res.sendStatus(200);
});

app.get('/health', (req, res) => {
  res.sendStatus(200);
});

app.listen(3000, () => {
  logger.info('Started app on port 3000');
});
