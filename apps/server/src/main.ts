import { NestFactory } from '@nestjs/core';
import { SimulationApiModule } from './simulation-api.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(SimulationApiModule);
  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('PORT');

  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'], // Allow all origins for simplicity. Adjust as needed.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  });

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setBasePath('api')
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
