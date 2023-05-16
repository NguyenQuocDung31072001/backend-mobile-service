import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.use(
    cors({
      origin: 'http://localhost:5173',
      methods: 'GET,POST',
      allowedHeaders: 'Content-Type,Authorization',
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('backend-mobile')
    .setDescription('api public for mobile development subject!')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
