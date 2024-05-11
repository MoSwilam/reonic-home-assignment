import { BadRequestException, Injectable } from '@nestjs/common';
import { chargingDemands, evArrivalProbabilities } from './data';
import { IChargePoint, SimulationOptions, SimulationResultDto } from './types';
import { SimulationOutput } from 'src/simulation-api/schemas/simulation-output.schema';
import { SimulationInputDto } from 'src/common/dto/simulation.request.dto';

@Injectable()
export class SimulationService {
  private defaultNumberOfChargePoints: number = 20;
  private deafultTotalIntervals: number = 35040; // 15 minutes intervals in a year
  private defaultPowerPerChargePointKw: number = 11;
  private defaultIntervalDurationHours: number = 0.25;
  private defaultEvConsumptionKwhPer100Km: number = 18;

  getSimulationOptions(payload: SimulationInputDto): SimulationOptions {
    if (!payload || Object.keys(payload).length === 0) {
      return {
        numberOfChargePoints: this.defaultNumberOfChargePoints,
        numberOfIntevals: this.deafultTotalIntervals,
        intervalDurationHours: this.defaultIntervalDurationHours,
        evConsumptionKwhPer100Km: this.defaultEvConsumptionKwhPer100Km,
        chargingPowerPerChargePointKw: this.defaultPowerPerChargePointKw,
      };
    }

    for (const [key, value] of Object.entries(payload)) {
      if (!value || value <= 0) {
        throw new BadRequestException(
          `Invalid value provided for '${key}'. It must be a positive number.`,
        );
      }
    }

    return {
      ...payload,
      numberOfIntevals: this.deafultTotalIntervals,
      intervalDurationHours: this.defaultIntervalDurationHours,
    };
  }

  /**
   * Runs the simulation for one year and calculates the total energy consumed, maximum power demand, and concurrency factor.
   * @returns An object containing the outputs of the simulation.
   */
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
        
        // Simulating the arrival of an EV
        if (!chargepoint.occupied && Math.random() < arrivalProbability) {
          chargepoint.occupied = true;
          const chargingDemand = this.selectChargingDemandBasedOnProbability();
          const kmRange = chargingDemand;

          // Convert km range to energy needed in kWh
          chargepoint.energyNeeded = +(
            (kmRange / 100) *
            evConsumptionKwhPer100Km
          ).toFixed(2); 
        }


        // Simulating the charging process
        if (chargepoint.occupied) {
          const energyProvidedThisInterval: number =
            chargingPowerPerChargePointKw * intervalDurationHours;

          chargepoint.energyNeeded -= energyProvidedThisInterval;
          intervalPowerDemand += chargingPowerPerChargePointKw;

          // Check if charging is complete
          if (chargepoint.energyNeeded <= 0) {
            chargepoint.occupied = false;
          }
        }

        // Calculate the total energy consumed and the maximum power demand
        totalEnergyConsumed += intervalPowerDemand * intervalDurationHours;
        totalPowerDemand += intervalPowerDemand;
        if (intervalPowerDemand > maxPowerDemand) {
          maxPowerDemand = intervalPowerDemand;
        }
      }
    }

    const theoriticalMaxPowerDemand: number =
      chargingPowerPerChargePointKw * numberOfChargePoints;

    const averagePowerDemand: number =
      totalPowerDemand / oneYear15MinutesInterval;

    const concurrencyFactor: number = +(
      averagePowerDemand / theoriticalMaxPowerDemand
    ).toFixed(2);

    const output: SimulationResultDto = {
      theoriticalMaxPowerDemand: `${theoriticalMaxPowerDemand}KW`,
      actualMaxPowerDemand: `${maxPowerDemand}KW`,
      totalEnergyConsumed: `${totalEnergyConsumed}KWH`,
      concurrencyFactor: `${concurrencyFactor * 100}%`,
    };

    return output;
  }

  /**
   * Selects a charging demand based on the probability of each demand.
   * @returns The number of kilometers of range to be added to the EV.
   */
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

    // Generate a random number between 0 and 1
    const randomNumber = Math.random();

    // Find the first range where the cumulative probability exceeds the random number
    const selectedDemandIndex = cumulativeProbabilities.findIndex(
      (cp) => cp > randomNumber,
    );
    return chargingDemands[selectedDemandIndex].kmRange;
  }

  
  /**
   * Converts a 15-minute interval index into an hourly index and retrieves the arrival probability.
   * @param intervalIndex The index of the current 15-minute interval (0 to 35039)
   * @returns The probability of an EV arrival during the interval.
   */
  getArrivalProbabilityBasedOnData(intervalIndex: number): number {
    const intervalsPerHour = 4;
    const hourIndex = Math.floor(intervalIndex / intervalsPerHour); // Determine which hour the interval belongs to
    const hourProbability = evArrivalProbabilities[hourIndex % 24].probability; // Use the probability for the corresponding hour
    const probability = hourProbability / intervalsPerHour; // Divide the hourly probability evenly among the four 15-minute intervals
    const decimalProbability = probability / 100; // convert it to decimal to compare it with Math.random()
    return decimalProbability;
  }


  /**
   * Retrieves the arrival probability for the given interval index.
   * @param intervalIndex The index of the current 15-minute interval (0 to 35039)
   * @param payload The payload containing the arrival probability multiplier.
   * @returns The probability of an EV arrival during the interval.
   */
  getArrivalProbability(intervalIndex: number, payload?: SimulationInputDto): number {
    let arrivalProbability: number;
    if (
      payload &&
      payload.arrivalProbabilityMultiplier &&
      payload.arrivalProbabilityMultiplier > 0
    ) {
      arrivalProbability = payload.arrivalProbabilityMultiplier / 100;
    } else {
      arrivalProbability = this.getArrivalProbabilityBasedOnData(intervalIndex);
    }

    return arrivalProbability;
  }
}
