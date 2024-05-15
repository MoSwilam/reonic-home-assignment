import { Module } from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import { SimulationApiController } from './simulation-api.controller';
import {
  SimulationInput,
  SimulationInputSchema,
} from './schemas/simulation-input.schema';
import {
  SimulationOutput,
  SimulationOutputSchema,
} from './schemas/simulation-output.schema';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import *  as Joi from 'joi';
import { DatabaseModule, LoggingInterceptor } from '@app/common';
import { SimulationService } from './simulation.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/simulation/.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        SWAGGER_URI: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: SimulationInput.name, schema: SimulationInputSchema },
      { name: SimulationOutput.name, schema: SimulationOutputSchema },
    ]),
  ],
  controllers: [SimulationApiController],
  providers: [
    SimulationApiService,
    SimulationService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
   }
  ],
})
export class SimulationApiModule {}
