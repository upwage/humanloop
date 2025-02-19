import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { WorkbenchService } from './workbench.service';
import { CreateWorkbenchTestDto } from './dto/create-workbench-test.dto';
import { CreateWorkbenchTestInputDataDto } from './dto/create-workbench-test-input-data.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateWorkbenchTestInputDataDto } from './dto/update-workbench-test-input-data.dto';
import { UpdateWorkbenchTestDto } from './dto/update-workbench-test.dto';
import { WorkbenchTest } from './entities/workbench.test.entity';
import { WorkbenchTestInputData } from './entities/workbench.test_input_data.entity';

@ApiBearerAuth('bearer')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(AuthGuard('bearer'))
@Controller('workbench')
export class WorkbenchController {
  constructor(private readonly workbenchService: WorkbenchService) {}

  @Post('test')
  @ApiOperation({ summary: 'Create workbench test' })
  @ApiResponse({
    status: 201,
    description: 'The workbench test has been successfully created.',
    type: CreateWorkbenchTestDto,
  })
  async createTest(@Body() createWorkbenchTestDto: CreateWorkbenchTestDto) {
    return await this.workbenchService.createWorkbenchTest(createWorkbenchTestDto);
  }

  @Post('test/:id')
  @ApiResponse({
    status: 200,
    description: 'The workbench test has been successfully updated.',
    type: UpdateWorkbenchTestDto,
  })
  @ApiOperation({ summary: 'Update workbench test' })
  async updateTest(
    @Param('id') id: string,
    @Body() updateWorkbenchTestDto: UpdateWorkbenchTestDto,
  ) {
    return await this.workbenchService.updateWorkbenchTest(
      id,
      updateWorkbenchTestDto,
    );
  }

  @Delete('test/:id')
  @ApiOperation({ summary: 'Delete workbench test' })
  @ApiResponse({
    status: 200,
    description: 'The workbench test has been successfully deleted.',
  })
  async deleteTest(@Param('id') id: string) {
    return await this.workbenchService.deleteWorkbenchTest(id);
  }

  @Get('test/:id')
  @ApiOperation({ summary: 'Get workbench test' })
  @ApiResponse({
    status: 200,
    description: 'The workbench test has been successfully retrieved.',
    type: WorkbenchTest,
  })
  async getTest(@Param('id') id: string) {
    return await this.workbenchService.getWorkbenchTest(id);
  }

  @Get('test')
  @ApiOperation({ summary: 'Get workbench tests' })
  @ApiResponse({
    status: 200,
    description: 'The workbench tests have been successfully retrieved.',
    type: [WorkbenchTest],
  })
  async getTests() {
    return await this.workbenchService.getWorkbenchTests();
  }

  @Post('test-input-data')
  @ApiOperation({ summary: 'Create workbench test input data' })
  @ApiResponse({
    status: 201,
    description: 'The workbench test input data has been successfully created.',
    type: CreateWorkbenchTestInputDataDto,
  })
  async createTestInputData(
    @Body() createWorkbenchTestInputDataDto: CreateWorkbenchTestInputDataDto,
  ) {
    return await this.workbenchService.createWorkbenchTestInputData(
      createWorkbenchTestInputDataDto,
    );
  }

  @Post('test-input-data/:id')
  @ApiOperation({ summary: 'Update workbench test input data' })
  @ApiResponse({
    status: 200,
    description: 'The workbench test input data has been successfully updated.',
    type: UpdateWorkbenchTestInputDataDto,
  })
  async updateTestInputData(
    @Param('id') id: string,
    @Body() updateWorkbenchTestInputDataDto: UpdateWorkbenchTestInputDataDto,
  ) {
    return await this.workbenchService.updateWorkbenchTestInputData(
      id,
      updateWorkbenchTestInputDataDto,
    );
  }

  @Delete('test-input-data/:id')
  @ApiOperation({ summary: 'Delete workbench test input data' })
  @ApiResponse({
    status: 200,
    description: 'The workbench test input data has been successfully deleted.',
  })
  async deleteTestInputData(@Param('id') id: string) {
    return await this.workbenchService.deleteWorkbenchTestInputData(id);
  }

  @Get('test-input-data/:id')
  @ApiOperation({ summary: 'Get workbench test input data' })
  @ApiResponse({
    status: 200,
    description:
      'The workbench test input data has been successfully retrieved.',
    type: WorkbenchTestInputData,
  })
  async getTestInputData(@Param('id') id: string) {
    return await this.workbenchService.getWorkbenchTestInputData(id);
  }

  @Get('test-input-data')
  @ApiOperation({ summary: 'Get all workbench test input data' })
  @ApiResponse({
    status: 200,
    description: 'All workbench test input data has been successfully retrieved.',
    type: [WorkbenchTestInputData],
  })
  async getAllTestInputData() {
    return await this.workbenchService.getAllWorkbenchTestInputData();
  }

  @Get('prompts')
  @ApiOperation({ summary: 'Get all workbench prompts' })
  @ApiResponse({
    status: 200,
    description: 'All workbench prompts has been successfully retrieved.',
    type: [Object],
  })
  async getAllPrompts() {
    return await this.workbenchService.getAllWorkbenchPrompts();
  }

  @Post('start/test/:id')
  @ApiOperation({ summary: 'Start workbench test' })
  @ApiResponse({
    status: 200,
    description: 'The workbench test has been successfully started.',
  })
  async startTest(@Param('id') testId: string) {
    return await this.workbenchService.startWorkbenchTest(testId);
  }
}
