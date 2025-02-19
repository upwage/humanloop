import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateWorkbenchTestInputDataDto {
  @ApiProperty({
    description: 'The parent ID of the test input data',
    type: String,
    format: 'uuid',
    required: false,
  })
  @IsUUID()
  parentId?: string;

  @ApiProperty({
    description: 'The name of the test input data',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The version number of the test input data',
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  versionNumber: number;

  @ApiProperty({
    description: 'The version description of the test input data',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  versionDescription: string;

  @ApiProperty({
    description: 'The basic information of the test input data',
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  basicInformation: any;

  @ApiProperty({
    description: 'The statements of the test input data',
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  statements: any;

  @ApiProperty({
    description: 'The questions of the test input data',
    type: Object,
  })
  @IsObject()
  @IsNotEmpty()
  questions: any;
}
