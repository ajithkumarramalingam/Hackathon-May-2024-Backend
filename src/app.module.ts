import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { WinstonModule } from 'nest-winston';
import { SessionDetailsModule } from './session-details/session-details.module';
import * as winston from 'winston';
import { NgxUiLoaderConfig } from 'ngx-ui-loader';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      // synchronize: true,
    }),
    ServeStaticModule.forRoot(),

    WinstonModule.forRoot({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.colorize()
      ),
      
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",

          format: winston.format.colorize(),
        }),
        new winston.transports.File({
          filename: "logs/activity.log",
          level: "info",
          format: winston.format.colorize(),
        }),
        new winston.transports.File({
          filename: "logs/combined.log",
        }),
        new winston.transports.File({
          filename: "logs/debug.log",
          level: "debug",
        }),
      ],
    }),
    SessionDetailsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
