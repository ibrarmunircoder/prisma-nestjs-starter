import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private readonly logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const isDevelopment =
      this.configService.get('environment') === 'development';

    const { combine, json, timestamp, colorize, printf } = winston.format;

    const logFormat = isDevelopment
      ? combine(
          colorize(),
          timestamp(),
          printf(({ timestamp, level, context, message, metadata }) => {
            return `${timestamp as string} ${level} [${context as string}] ${message as string} ${metadata ? JSON.stringify(metadata) : ''}`;
          }),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      format: logFormat,
      transports: [new winston.transports.Console()],
    });
  }

  error(message: string, trace?: string, context?: string, metadata?: unknown) {
    this.logger.error(message, {
      trace,
      context,
      metadata,
    });
  }

  log(message: string, context?: string, metadata?: unknown) {
    this.logger.info(message, {
      context,
      metadata,
    });
  }

  warn(message: string, context?: string, metadata?: unknown) {
    this.logger.warn(message, {
      context,
      metadata,
    });
  }
}
