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
  theoriticalMaxPowerDemand: string;

  @Prop()
  actualMaxPowerDemand: string;

  @Prop()
  totalEnergyConsumed: string;

  @Prop()
  concurrencyFactor: string;
}

export const SimulationOutputSchema =
  SchemaFactory.createForClass(SimulationOutput);
