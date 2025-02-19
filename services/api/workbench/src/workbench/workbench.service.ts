import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkbenchTest } from './entities/workbench.test.entity';
import { WorkbenchTestInputData } from './entities/workbench.test_input_data.entity';
import { CreateWorkbenchTestDto } from './dto/create-workbench-test.dto';
import { UpdateWorkbenchTestDto } from './dto/update-workbench-test.dto';
import { CreateWorkbenchTestInputDataDto } from './dto/create-workbench-test-input-data.dto';
import { UpdateWorkbenchTestInputDataDto } from './dto/update-workbench-test-input-data.dto';
import {
  GetQueueUrlCommand,
  SQSClient,
  SendMessageCommand,
} from '@aws-sdk/client-sqs';
import configureSqsClient from '../common/queues/sqs';
import { HumanloopClient } from 'humanloop';


async function getAllPrompts(humanloop: HumanloopClient, pullJobId: string, logger: Logger, page: number = 1, size: number = 100): Promise<any | boolean> {

  logger.log('Pulling prompts from humanloop', { pullJobId });
  let allPrompts = [];
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await humanloop.files.listFiles({
        type: 'prompt',
        environment: process.env.DEPLOYED_ENVIRONMENT,
        page: page,
        size: size,
      });
      if (response.records && response.records.length > 0) {
        logger.log(
          `Retrieved ${response.records?.length || 0} prompts from page ${page}`,
          { pullJobId },
        );
        allPrompts = allPrompts.concat(response.records);
        page++;
      } else {
        logger.log('No more prompts to retrieve', { pullJobId });
        hasMore = false;
      }
    } catch (error) {
      logger.error('Error pulling prompts from humanloop', {
        pullJobId,
        error,
      });
      return false;
    }
  }

  logger.log(`Retrieved total of ${allPrompts.length} prompts`, { pullJobId });
  return allPrompts;
}

@Injectable()
export class WorkbenchService {
  constructor(
    @InjectRepository(WorkbenchTest)
    private readonly workbenchTestRepository: Repository<WorkbenchTest>,

    @InjectRepository(WorkbenchTestInputData)
    private readonly workbenchTestInputDataRepository: Repository<WorkbenchTestInputData>,

    private readonly logger: Logger,
  ) {}

  async createWorkbenchTest(createWorkbenchTestDto: CreateWorkbenchTestDto) {
    const workbenchTest = await this.workbenchTestRepository.create({
      ...createWorkbenchTestDto,
      testInputData: createWorkbenchTestDto.testInputDataId
        ? { id: createWorkbenchTestDto.testInputDataId }
        : null,
    });
    const savedWorkbenchTest =
      await this.workbenchTestRepository.save(workbenchTest);
    console.log('savedWorkbenchTest', savedWorkbenchTest);
    this.startWorkbenchTest(savedWorkbenchTest.id);
    return savedWorkbenchTest;
  }

  async updateWorkbenchTest(
    id: string,
    updateWorkbenchTestDto: UpdateWorkbenchTestDto,
  ) {
    const existingWorkbenchTest = await this.workbenchTestRepository.findOneBy({
      id,
    });
    if (!existingWorkbenchTest) {
      throw new NotFoundException(`Workbench test with ID ${id} not found`);
    }
    const updatedWorkbenchTest = Object.assign(
      existingWorkbenchTest,
      updateWorkbenchTestDto,
    );
    return await this.workbenchTestRepository.save(updatedWorkbenchTest);
  }

  async deleteWorkbenchTest(id: string) {
    const existingWorkbenchTest = await this.workbenchTestRepository.findOneBy({
      id,
    });
    if (!existingWorkbenchTest) {
      throw new NotFoundException(`Workbench test with ID ${id} not found`);
    }
    return await this.workbenchTestRepository.remove(existingWorkbenchTest);
  }

  async getWorkbenchTest(id: string) {
    const existingWorkbenchTest = await this.workbenchTestRepository.findOne({
      where: { id },
      relations: ['testInputData'],
    });
    if (!existingWorkbenchTest) {
      throw new NotFoundException(`Workbench test with ID ${id} not found`);
    }
    return existingWorkbenchTest;
  }

  async getWorkbenchTests(): Promise<WorkbenchTest[]> {
    return await this.workbenchTestRepository.find();
  }

  async createWorkbenchTestInputData(
    createWorkbenchTestInputDataDto: CreateWorkbenchTestInputDataDto,
  ) {
    const workbenchTestInputData = this.workbenchTestInputDataRepository.create(
      {
        ...createWorkbenchTestInputDataDto,
        parentId: createWorkbenchTestInputDataDto.parentId
          ? { id: createWorkbenchTestInputDataDto.parentId }
          : null,
      },
    );
    return await this.workbenchTestInputDataRepository.save(
      workbenchTestInputData,
    );
  }

  async updateWorkbenchTestInputData(
    id: string,
    updateWorkbenchTestInputDataDto: UpdateWorkbenchTestInputDataDto,
  ) {
    const existingWorkbenchTestInputData =
      await this.workbenchTestInputDataRepository.findOneBy({ id });
    if (!existingWorkbenchTestInputData) {
      throw new NotFoundException(
        `Workbench test input data with ID ${id} not found`,
      );
    }
    const updatedWorkbenchTestInputData = Object.assign(
      existingWorkbenchTestInputData,
      updateWorkbenchTestInputDataDto,
    );
    return await this.workbenchTestInputDataRepository.save(
      updatedWorkbenchTestInputData,
    );
  }

  async deleteWorkbenchTestInputData(id: string) {
    const existingWorkbenchTestInputData =
      await this.workbenchTestInputDataRepository.findOneBy({ id });
    if (!existingWorkbenchTestInputData) {
      throw new NotFoundException(
        `Workbench test input data with ID ${id} not found`,
      );
    }
    return await this.workbenchTestInputDataRepository.remove(
      existingWorkbenchTestInputData,
    );
  }

  async getWorkbenchTestInputData(id: string) {
    const existingWorkbenchTestInputData =
      await this.workbenchTestInputDataRepository.findOneBy({ id });
    if (!existingWorkbenchTestInputData) {
      throw new NotFoundException(
        `Workbench test input data with ID ${id} not found`,
      );
    }
    return existingWorkbenchTestInputData;
  }

  async getAllWorkbenchTestInputData(): Promise<WorkbenchTestInputData[]> {
    return await this.workbenchTestInputDataRepository.find();
  }

  async getAllWorkbenchPrompts(): Promise<any> {
    const pullJobId = "humanpull_" + uuidv4();
    const humanloop = new HumanloopClient({
      apiKey: process.env.HUMANLOOP_API_KEY,
    });
    const allPrompts = await getAllPrompts(humanloop, pullJobId, this.logger);
    console.log(allPrompts);

    return {
      screener_prompts: [],
      personas: [],
    };
  }

  private async getQueueUrl(sqsClient: any, queueName: any): Promise<any> {
    const command = new GetQueueUrlCommand({ QueueName: queueName });
    const response = await sqsClient.send(command);
    return response.QueueUrl;
  }

  async startWorkbenchTest(testId: string) {
    const taskName = 'start-workbench-test';
    this.logger.debug(`Task ${taskName} started`);

    const queueName = process.env.WORKBENCH_EVALUATION_PROCESSING_QUEUE;

    const sqsClientConfig = configureSqsClient();

    // -- we always send the message to the sqs queue
    const sqsClient = new SQSClient(sqsClientConfig);
    const queueUrl = await this.getQueueUrl(sqsClient, queueName);

    // clone createMessage and add a random number & timestamp to the message body to avoid deduplication
    const messageBody = {
      task: taskName,
      testId: testId,
      deduplicationId: testId,
    };

    console.log('messageBody', messageBody);

    // Content-based deduplication is enabled by default for FIFO queues
    const sendMessageComand = new SendMessageCommand({
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(messageBody),
      MessageGroupId: 'tasks',
    });

    try {
      // Send the message to the SQS queue
      const data = await sqsClient.send(sendMessageComand);
      this.logger.debug(
        `Success, task ${taskName} sent to ${queueName}. Message ID: ${JSON.stringify(
          data.MessageId,
        )}`,
      );
    } catch (err) {
      this.logger.error('Error' + JSON.stringify(err));
      return {
        status: 'error',
        message: `Error enqueuing ${taskName} task`,
      };
    }

    return {
      status: 'success',
      message: `Task ${taskName} sent`,
    };
  }
}
