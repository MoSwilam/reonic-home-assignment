// outputs.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { AbstractDocument } from 'src/common/abstract.schema';

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