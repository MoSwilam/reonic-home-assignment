import { IChargingDemand, ITimeInterval } from './types';

export const simplifiedArrivalProbability: ITimeInterval[] = [
  { period: '00:00 - 01:00', probability: 0.94 },
  { period: '01:00 - 02:00', probability: 2.83 },
  { period: '02:00 - 03:00', probability: 10.38 },
];

export const evArrivalProbabilities: ITimeInterval[] = [
  { period: '00:00 - 01:00', probability: 0.94 },
  { period: '01:00 - 02:00', probability: 0.94 },
  { period: '02:00 - 03:00', probability: 0.94 },
  { period: '03:00 - 04:00', probability: 0.94 },
  { period: '04:00 - 05:00', probability: 0.94 },
  { period: '05:00 - 06:00', probability: 0.94 },
  { period: '06:00 - 07:00', probability: 0.94 },
  { period: '07:00 - 08:00', probability: 0.94 },
  { period: '08:00 - 09:00', probability: 2.83 },
  { period: '09:00 - 10:00', probability: 2.83 },
  { period: '10:00 - 11:00', probability: 5.66 },
  { period: '11:00 - 12:00', probability: 5.66 },
  { period: '12:00 - 13:00', probability: 5.66 },
  { period: '13:00 - 14:00', probability: 7.55 },
  { period: '14:00 - 15:00', probability: 7.55 },
  { period: '15:00 - 16:00', probability: 7.55 },
  { period: '16:00 - 17:00', probability: 10.38 },
  { period: '17:00 - 18:00', probability: 10.38 },
  { period: '18:00 - 19:00', probability: 10.38 },
  { period: '19:00 - 20:00', probability: 4.72 },
  { period: '20:00 - 21:00', probability: 4.72 },
  { period: '21:00 - 22:00', probability: 4.72 },
  { period: '22:00 - 23:00', probability: 0.94 },
  { period: '23:00 - 24:00', probability: 0.94 },
];

export const chargingDemands: IChargingDemand[] = [
  { kmRange: 0, probability: 34.31 },
  { kmRange: 5.0, probability: 4.9 },
  { kmRange: 10.0, probability: 9.8 },
  { kmRange: 20.0, probability: 11.76 },
  { kmRange: 30.0, probability: 8.82 },
  { kmRange: 50.0, probability: 11.76 },
  { kmRange: 100.0, probability: 10.78 },
  { kmRange: 200.0, probability: 4.9 },
  { kmRange: 300.0, probability: 2.94 },
];
