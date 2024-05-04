import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  const configService: ConfigService = app.get(ConfigService);
  const express = require('express');
  app.enableCors(
    {
      credentials: true,
      origin: true
    }
  );

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.setGlobalPrefix("api");
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("sessionManagement")
    .setDescription("The sessionManagement API description")
    .setVersion("1.0")
    .addTag("sessionManagement")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("apis", app, document);
}
bootstrap();
