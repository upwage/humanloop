import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkbenchTest } from './entities/workbench.test.entity';
import { WorkbenchTestInputData } from './entities/workbench.test_input_data.entity';
import { WorkbenchController } from './workbench.controller';
import { WorkbenchService } from './workbench.service';
import { Module } from '@nestjs/common';
import { Logger } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([WorkbenchTest, WorkbenchTestInputData])],
  controllers: [WorkbenchController],
  providers: [WorkbenchService, Logger],
  exports: [WorkbenchService],
})
export class WorkbenchModule {}
