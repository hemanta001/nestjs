import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
import { urlencoded, json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const corsOptionsDelegate = function (request, callback) {
    const host = request.headers.host;
    const origin = request.headers.origin
        ? request.headers.origin.split('://')[1]
        : host;
    if (!request.headers.origin) request.headers.origin = origin;
    if (process.env.ALLOWED_DOMAINS.split(',').includes(origin))
      callback(null, { origin: true });
    else
      callback(
          new BadRequestException(
              'Domain not allowed. Please contact administration.',
          ),
          { origin: false },
      );
  };
  // app.use(helmet());
  app.enableCors(corsOptionsDelegate);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalInterceptors(new TransformInterceptor());

  const options = new DocumentBuilder()
      .setTitle('API for smart')
      .setVersion('V1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, options);
  const optionsSetup = {
    explorer: false,
    customCss:
        '.swagger-ui .models, .topbar {\n' +
        '    display: none !important;\n' +
        '}\n' +
        '.topbar, .version-stamp {\n' +
        '    display: none !important;\n' +
        '}\n' +
        '.swagger-ui .scheme-container {\n' +
        '    padding: 5px 0;\n' +
        '}\n' +
        '.swagger-ui .info {\n' +
        '    margin: 10px 0 !important;\n' +
        '}',
  };
  SwaggerModule.setup('api/v1/docs', app, document, optionsSetup);
  await app.listen(parseInt(process.env.APP_PORT) || 3000);
}

bootstrap()
    .then(() => {
      console.log(`Server running on http://localhost:${process.env.APP_PORT}/`);
      console.log(
          `For API documentation on http://localhost:${process.env.APP_PORT}/api/v1/docs`,
      );
    })
    .catch((error) => {
      console.log('Error: ', error.measure || error || error.message);
    });
