import { Injectable } from '@nestjs/common';
import { chargingDemands, evArrivalProbabilities } from './data';
import { SimulationInputDto } from 'src/common/dto/simulation.request.dto';
import { IChargePoint, SimulationOptions, SimulationResultDto } from './types';
import { SimulationOutput } from './schemas/simulation-output.schema';

@Injectable()
export class SimulationService {
  private defaultNumberOfChargePoints: number = 20;
  private defaultTotalIntervals: number = 35040; // 15 minutes intervals in a year
  private defaultPowerPerChargePointKw: number = 11;
  private defaultIntervalDurationHours: number = 0.25;
  private defaultEvConsumptionKwhPer100Km: number = 18;

  getSimulationOptions(payload: SimulationInputDto): SimulationOptions {
    if (!payload || !Object.keys(payload).length) {
      return {
        numberOfChargePoints: this.defaultNumberOfChargePoints,
        numberOfIntevals: this.defaultTotalIntervals,
        intervalDurationHours: this.defaultIntervalDurationHours,
        evConsumptionKwhPer100Km: this.defaultEvConsumptionKwhPer100Km,
        chargingPowerPerChargePointKw: this.defaultPowerPerChargePointKw,
      };
    }

    return {
      ...payload,
      numberOfIntevals: this.defaultTotalIntervals,
      intervalDurationHours: this.defaultIntervalDurationHours,
    };
  }

 
  runSimulation(payload?: SimulationInputDto): Omit<SimulationOutput, '_id'> {
    const {
      numberOfChargePoints,
      evConsumptionKwhPer100Km,
      chargingPowerPerChargePointKw,
      intervalDurationHours,
      numberOfIntevals: oneYear15MinutesInterval, // renaming for clarity
    } = this.getSimulationOptions(payload);

    let totalEnergyConsumed = 0;
    let maxPowerDemand = 0; // To track the highest power demand at any interval
    let totalPowerDemand = 0; // To calculate average power demand

    /** init chargingPoints */
    const chargepoints: IChargePoint[] = Array.from(
      { length: numberOfChargePoints },
      () => ({
        occupied: false,
        energyNeeded: 0,
      }),
    );

    for (let i = 0; i < oneYear15MinutesInterval; i++) {
      let intervalPowerDemand = 0;
      for (const chargepoint of chargepoints) {

        const arrivalProbability: number = this.getArrivalProbability(i, payload);

        /** Simulating the arrival of an EV */
        if (!chargepoint.occupied && Math.random() < arrivalProbability) {
          chargepoint.occupied = true;
          const chargingDemand = this.selectChargingDemandBasedOnProbability();
          const kmRange = chargingDemand;

          /** Convert km range to energy needed in kWh */
          chargepoint.energyNeeded = +(
            (kmRange / 100) *
            evConsumptionKwhPer100Km
          ).toFixed(2);
        }

        /** Simulating the charging process */
        if (chargepoint.occupied) {
          const energyProvidedThisInterval: number =
            chargingPowerPerChargePointKw * intervalDurationHours;

          chargepoint.energyNeeded -= energyProvidedThisInterval;
          intervalPowerDemand += chargingPowerPerChargePointKw;

          /** Check if charging is complete */
          if (chargepoint.energyNeeded <= 0) {
            chargepoint.occupied = false;
          }
        }

        /** Calculate the total energy consumed and the maximum power demand */
        totalEnergyConsumed += intervalPowerDemand * intervalDurationHours;
        totalPowerDemand += intervalPowerDemand;
        if (intervalPowerDemand > maxPowerDemand) {
          maxPowerDemand = intervalPowerDemand;
        }
      }
    }

    /** Calculate theoritical max power demand and concurrency factor */
    const theoriticalMaxPowerDemand: number =
      chargingPowerPerChargePointKw * numberOfChargePoints;

    const averagePowerDemand: number =
      totalPowerDemand / oneYear15MinutesInterval;

    const concurrencyFactor: number = +(
      (averagePowerDemand / theoriticalMaxPowerDemand) * 100
    ).toFixed(2);

    const output: SimulationResultDto = {
      theoriticalMaxPowerDemand: theoriticalMaxPowerDemand,
      actualMaxPowerDemand: maxPowerDemand,
      totalEnergyConsumed: totalEnergyConsumed,
      concurrencyFactor: concurrencyFactor,
    };

    return output;
  }


  selectChargingDemandBasedOnProbability(): number {
    // Normalize probabilities to sum to 1 (if they do not already)
    const totalProbability = chargingDemands.reduce(
      (acc, cur) => acc + cur.probability,
      0,
    );

    const normalizedDemands = chargingDemands.map((d) => ({
      kmRange: d.kmRange,
      probability: d.probability / totalProbability,
    }));

    // Build the cumulative probability array
    const cumulativeProbabilities: number[] = [];
    normalizedDemands.reduce((acc, demand) => {
      cumulativeProbabilities.push(acc + demand.probability);
      return acc + demand.probability;
    }, 0);

    const randomNumber = Math.random();

    // Find the first range where the cumulative probability exceeds the random number
    const selectedDemandIndex = cumulativeProbabilities.findIndex(
      (cp) => cp > randomNumber,
    );
    return chargingDemands[selectedDemandIndex].kmRange;
  }

  getArrivalProbabilityBasedOnData(intervalIndex: number): number {
    const intervalsPerHour = 4;
    const hourIndex = Math.floor(intervalIndex / intervalsPerHour); // Determine which hour the interval belongs to
    const hourProbability = evArrivalProbabilities[hourIndex % 24].probability;
    const probability = hourProbability / intervalsPerHour;
    const decimalProbability = +(probability / 100).toFixed(2); // convert it to decimal to compare it with Math.random()
    return decimalProbability;
  }

 
  getArrivalProbability(intervalIndex: number, payload?: SimulationInputDto): number {
    let arrivalProbability: number;
    if (
      payload &&
      payload.arrivalProbabilityMultiplier &&
      payload.arrivalProbabilityMultiplier > 0
    ) {
      arrivalProbability = +(payload.arrivalProbabilityMultiplier / 100 / 100).toFixed(2);
    } else {
      arrivalProbability = this.getArrivalProbabilityBasedOnData(intervalIndex);
    }

    return arrivalProbability;
  }
}
