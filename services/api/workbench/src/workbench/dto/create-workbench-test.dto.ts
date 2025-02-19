import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';
import { EvaluationStatus } from 'src/common/enums/workbench_evaluation_status.enum';

export class CreateWorkbenchTestDto {
  @ApiProperty({
    description: 'The name of the test',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'The ID of the test input data',
    type: String,
    format: 'uuid',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  testInputDataId: string;

  @ApiProperty({
    description: 'The maximum number of turns',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  maxTurns: number;

  @ApiProperty({
    description: 'The total number of interviews',
    type: Number,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  totalInterviews: number;

  @ApiProperty({
    description: 'The ID of the screener prompt',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hlScreenerPromptId: string;

  @ApiProperty({
    description: 'The list of persona prompts',
    type: [String],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  hlPersonaPromptList: string[];

  @ApiProperty({
    description: 'The list of evaluation prompts',
    type: [String],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  hlEvaluationPromptList: string[];

  @ApiProperty({
    description: 'The evaluation status',
    type: EvaluationStatus,
    required: true,
    enum: EvaluationStatus,
    default: EvaluationStatus.NEW,
  })
  @IsEnum(EvaluationStatus)
  evaluationStatus: EvaluationStatus;

  @ApiProperty({
    description: 'The ID of the evaluation',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hlEvaluationId: string;

  @ApiProperty({
    description: 'The evaluation summary',
    type: Object,
    required: true,
  })
  @IsObject()
  @IsNotEmpty()
  hlEvaluationSummary: any;
}
