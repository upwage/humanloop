import { PartialType } from '@nestjs/swagger';
import { CreateWorkbenchTestDto } from './create-workbench-test.dto';

export class UpdateWorkbenchTestDto extends PartialType(
  CreateWorkbenchTestDto,
) {}
