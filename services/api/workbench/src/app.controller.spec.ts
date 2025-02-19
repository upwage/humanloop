import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SwaggerService } from './swagger.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        SwaggerService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getHealthCheck', () => {
    it('should return "OK"', () => {
      expect(appController.getHealthCheck()).toBe('OK');
    });
  });
});
