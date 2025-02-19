import { str, cleanEnv, port, url, num } from 'envalid';
cleanEnv(process.env, {
  NEW_RELIC_APP_NAME: str(),
  NEW_RELIC_LICENSE_KEY: str(),
  NEW_RELIC_USER_KEY: str(),
});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const newrelic = require('newrelic');
import { NewrelicInterceptor } from './newrelic.interceptor';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerService } from './swagger.service';
import { setupRedoc } from './redoc.middleware';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import TransportStream from 'winston-transport';
import { urlencoded, json } from 'express';

class NewRelicTransport extends TransportStream {
  log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    // Customize the log format as needed
    const logEvent = {
      appName: process.env.NEW_RELIC_APP_NAME,
      level: info.level,
      message: info.message,
      timestamp: info.timestamp,
      ...info.meta, // Include any additional metadata
    };

    newrelic.recordCustomEvent('LogEvent', logEvent);

    callback();
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        new NewRelicTransport({
          level: 'info',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json(),
          ),
        }),
      ],
    }),
  });
  // app.use(morgan('dev')); // 'dev' is a predefined format string -> install morgan if we need http level logging
  app.setGlobalPrefix('workbench');
  app.useGlobalInterceptors(new NewrelicInterceptor());

  app.use(json({ limit: '100mb' }));
  app.use(urlencoded({ extended: true, limit: '100mb' }));

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl / mobile apps)
      if (!origin) return callback(null, true);

      // Local Development
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS: [' + origin + ']'));
    },
  });

  const swaggerService = app.get(SwaggerService);
  swaggerService.createDocument(app);

  setupRedoc(app);

  await app.listen(3000);
}

bootstrap();
