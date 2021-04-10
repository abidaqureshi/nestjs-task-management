import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger(); //
  const app = await NestFactory.create(AppModule);
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({ origin: serverConfig.origin });
    logger.log(
      `Server is accepting request from origin ${serverConfig.origin} `,
    );
  }

  await app.listen(port);
  logger.log(`Logger: Application is running on port ${port}`);
}
bootstrap();
