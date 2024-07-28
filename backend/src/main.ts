import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  };
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notes SPA')
    .setDescription('Ensolvers Note API documentation.')
    .setVersion('0.1')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

  app.enableCors(corsOptions);
  await app.listen(3001);
}
bootstrap();
