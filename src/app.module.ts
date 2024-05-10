import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { SimulationModule } from './simulation/simulation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SimulationApiModule } from './simulation-api/simulation-api.module';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    SimulationModule,
    SimulationApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        SWAGGER_URI: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [],
})
export class AppModule {}
