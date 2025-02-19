// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');
import winston from 'winston';
import TransportStream from 'winston-transport';
class NewRelicTransport extends TransportStream {
  log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    // Customize the log format as needed
    const logEvent = {
      appName: process.env.NEW_RELIC_APP_NAME,
      level: info.level,
      message: info.message,
      timestamp: info.timestamp,
      sessionId: info.sessionId || null,
      ...info.meta, // Include any additional metadata
    };

    newrelic.recordCustomEvent('LogEvent', logEvent);

    callback();
  }
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.timestamp()),
    }),
    new NewRelicTransport({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
    }),
  ],
});

module.exports = logger;
