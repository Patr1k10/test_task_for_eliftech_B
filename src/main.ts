import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('test-task-swagger')
    .setDescription('test-task-swagger')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    jsonDocumentUrl: 'swagger/swagger-json',
    customSiteTitle: 'Penguins API',
  });

  app.enableCors({
    origin: configService.get('FRONTEND_ORIGIN'),
    methods: configService.get('CRORS_METHODS'),
    credentials: true,
  });
  const server = await app.listen(configService.getOrThrow('API_PORT'));
  const address = server.address();
  if (typeof address !== 'string') {
    logger.log(`The server is running at the address: http://localhost:${address.port}`);
    logger.log(`Swagger description: http://localhost:${address.port}/swagger`);
  } else {
    logger.log(`The server is running at the address: ${address}`);
    logger.log(`Swagger description:${address}/swagger`);
  }
}
bootstrap();
