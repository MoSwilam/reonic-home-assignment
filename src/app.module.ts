import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { SimulationModule } from './simulation/simulation.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SimulationApiModule } from './simulation-api/simulation-api.module';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

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
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
   }
  ],
})
export class AppModule {}
