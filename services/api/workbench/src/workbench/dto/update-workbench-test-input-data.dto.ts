import { PartialType } from '@nestjs/swagger';
import { CreateWorkbenchTestInputDataDto } from './create-workbench-test-input-data.dto';

export class UpdateWorkbenchTestInputDataDto extends PartialType(
  CreateWorkbenchTestInputDataDto,
) {}
