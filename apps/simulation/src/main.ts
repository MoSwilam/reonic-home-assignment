import { NestFactory } from '@nestjs/core';
import { SimulationApiModule } from './simulation-api.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SimulationApiModule);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Reonic Simulation API')
    .setDescription('Reonic Simulation API documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${process.env.SWAGGER_URI}`, app, document);

  await app.listen(port);
  console.log(
    `-------- Reonic simulation APP is running on port: ${port} ---------`,
  );
}
bootstrap();
