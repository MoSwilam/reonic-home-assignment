// outputs.schema.ts
import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SimulationOutputDocument = SimulationOutput & Document;

@Schema({
  timestamps: true,
  versionKey: false,
  collection: SimulationOutput.name,
})
export class SimulationOutput extends AbstractDocument {
  @Prop()
  theoriticalMaxPowerDemand: number;

  @Prop()
  actualMaxPowerDemand: number;

  @Prop()
  totalEnergyConsumed: number;

  @Prop()
  concurrencyFactor: number;
}

export const SimulationOutputSchema =
  SchemaFactory.createForClass(SimulationOutput);
