import { Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

@Injectable()
export class SwaggerService {
  private swaggerDocument: any;

  constructor() {}

  createDocument(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Upwage Workbench API')
      .setDescription('Upwage Workbench API documentation')
      .setVersion('1.0')
      .addTag('upwage')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'bearer' },
        'bearer',
      )
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'jwt',
      )
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'jwt-refresh',
      )
      .build();

    this.swaggerDocument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/workbench/api', app, this.swaggerDocument);
  }

  getDocument() {
    return this.swaggerDocument;
  }
}
