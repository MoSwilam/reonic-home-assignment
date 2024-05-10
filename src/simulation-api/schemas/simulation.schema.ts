// results.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SimulationInputDocument = SimulationInput & Document;

@Schema()
export class SimulationInput {
  @Prop({ required: true })
  numberOfChargePoints: number;

  @Prop({ default: 100 })
  arrivalProbabilityMultiplier: number;

  @Prop({ default: 18 })
  consumptionPerCar: number;

  @Prop({ default: 11 })
  chargingPowerPerPoint: number;
}

export const SimulationInputSchema = SchemaFactory.createForClass(SimulationInput);
