import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SwaggerService } from './swagger.service';
import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { WorkbenchModule } from './workbench/workbench.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BearerStrategy } from './auth/bearer.strategy';
import { AppDataSource } from 'ormconfig';

@Module({
  imports: [
    WorkbenchModule,
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      // Warned to not set this true in production
      // Circumvents the need to run migrations
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, SwaggerService, Logger, BearerStrategy],
})
export class AppModule {
  constructor() {}
}
