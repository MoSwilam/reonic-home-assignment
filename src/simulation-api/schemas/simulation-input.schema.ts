import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { AbstractDocument } from 'src/common/abstract.schema';
import { SimulationOutput } from './simulation-output.schema';

export type SimulationInputDocument = SimulationInput & Document;

@Schema({ timestamps: true, versionKey: false, collection: SimulationInput.name})
export class SimulationInput extends AbstractDocument {
  @Prop({ required: true })
  numberOfChargePoints: number;

  @Prop({ default: 100 })
  arrivalProbabilityMultiplier: number;

  @Prop({ default: 18 })
  consumptionPerCar: number;

  @Prop({ default: 11 })
  chargingPowerPerPoint: number;

  @Prop({ type: Types.ObjectId, ref: SimulationOutput.name, required: false })
  output: SimulationOutput;
}

export const SimulationInputSchema = SchemaFactory.createForClass(SimulationInput);
