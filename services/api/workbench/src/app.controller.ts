import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SwaggerService } from './swagger.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly swaggerService: SwaggerService,
  ) {}

  @Get('healthcheck')
  @ApiOperation({
    summary: 'Health Check',
    description: 'Health Check for Load Balancer',
  })
  @ApiTags('system')
  getHealthCheck(): string {
    return 'OK';
  }

  @Get('api.json')
  @ApiOperation({
    summary: 'JSON API',
    description: 'API in JSON Format',
  })
  @ApiTags('system')
  getJson(): string | object {
    return this.swaggerService.getDocument();
  }
}
