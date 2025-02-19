import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SwaggerService } from './swagger.service';
import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { WorkbenchModule } from './workbench/workbench.module';

@Module({
  imports: [WorkbenchModule],
  controllers: [AppController],
  providers: [AppService, SwaggerService, Logger],
})
export class AppModule {
  constructor() {}
}
