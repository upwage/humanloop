import { Logger as NestLogger } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';

export class CustomDatabaseLogger implements Logger {
  private readonly logger = new NestLogger(CustomDatabaseLogger.name);
  private readonly responseSizeThreshold = 50 * 1024 * 1024; // 50 MB
  private readonly slowQueryThreshold = 5 * 1000; // 5 seconds

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): void {
    // Log query execution
    // this.logger.debug(`Executing Query: ${query}`);

    if (queryRunner?.data?.result) {
      const resultSize = this.estimateSize(queryRunner.data.result);

      if (resultSize > this.responseSizeThreshold) {
        this.logger.warn(
          `Query result exceeded size threshold (${resultSize} bytes): Query - ${query} Params - ${JSON.stringify(
            parameters,
          )}`,
        );
      }
    }
  }

  private estimateSize(obj: any): number {
    return Buffer.byteLength(JSON.stringify(obj));
  }

  logQueryError(error: string, query: string, parameters?: any[]): void {
    this.logger.error(`Query Error: ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]): void {
    if (time > this.slowQueryThreshold) {
      this.logger.warn(`Slow Query (${time} ms): ${query}`);
    }
  }

  logSchemaBuild(message: string): void {
    this.logger.debug(`Schema Build: ${message}`);
  }

  logMigration(message: string): void {
    this.logger.debug(`Migration: ${message}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any): void {
    this.logger.log(level, message);
  }
}
