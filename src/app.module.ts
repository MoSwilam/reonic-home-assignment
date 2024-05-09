import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { SimulationModule } from './simulation/simulation.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    SimulationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        SWAGGER_URI: Joi.string().required(),
      }),
    }),
  ],
  providers: [],
})
export class AppModule {}
