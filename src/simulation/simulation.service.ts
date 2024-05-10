import { Injectable, OnModuleInit } from '@nestjs/common';
import { chargingDemands, evArrivalProbabilities } from './data';
import { IChargePoint, SimulationResultDto } from './types';
import { SimulationOutput } from 'src/simulation-api/schemas/simulation-output.schema';
import { SimulationInputDto } from 'src/common/dto/simulation.request.dto';

@Injectable()
export class SimulationService {
  private NUM_CHARGE_POINTS: number = 20;
  private TOTAL_INTERVALS: number = 35040;
  private CHARGE_POWER_KW: number = 11;

  
  getDefaultSimulationOptions() {
    const initChargePoint = {
      occupied: false,
      energyNeeded: 0,
    }
    
    return {
      numberOfChargePoints: this.NUM_CHARGE_POINTS,
      totalInterval: this.TOTAL_INTERVALS,
      powerKw: this.CHARGE_POWER_KW,
      chargePoints: Array.from({ length: 20 }, () => initChargePoint),
    };
  }


  /**
   * Runs the simulation for one year and calculates the total energy consumed, maximum power demand, and concurrency factor.
   * @returns An object containing the outputs of the simulation.
   */
  runSimulation(payload?: SimulationInputDto): Omit<SimulationOutput, '_id'> {
    let totalEnergyConsumed = 0;
    let maxPowerDemand = 0; // Track the highest power demand at any interval
    let totalPowerDemand = 0; // To calculate average power demand

    const chargepoints: IChargePoint[] = Array.from({ length: 20 }, () => ({
      occupied: false,
      energyNeeded: 0,
    }));

    const oneYear15MinutesInterval = this.TOTAL_INTERVALS; // Total intervals in a year
    const intervalDurationHours = 0.25; // 15 minutes in hours

    // Iterate over each 15-minute interval in a year
    for (let i = 0; i < oneYear15MinutesInterval; i++) {
      let intervalPowerDemand = 0;

      // Iterate over each chargepoint
      for (const chargepoint of chargepoints) {
        // Simulating the arrival of an EV
        const arrivalProbability: number = this.getArrivalProbability(i);
        if (!chargepoint.occupied && Math.random() < arrivalProbability) {
          chargepoint.occupied = true;
          const chargingDemand = this.selectChargingDemandBasedOnProbability();
          const kmRange = chargingDemand;
          chargepoint.energyNeeded = this.calculateEnergyRequired(kmRange);
        }

        // Simulating the charging process
        if (chargepoint.occupied) {
          const energyProvidedThisInterval: number =
            this.CHARGE_POWER_KW * intervalDurationHours; // Each chargepoint delivers 11 kW, and each interval is 0.25 hours
          chargepoint.energyNeeded -= energyProvidedThisInterval;
          intervalPowerDemand += this.CHARGE_POWER_KW;

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
      this.CHARGE_POWER_KW * this.NUM_CHARGE_POINTS;
    const averagePowerDemand: number =
      totalPowerDemand / oneYear15MinutesInterval;
    const concurrencyFactor: number =
      averagePowerDemand / theoriticalMaxPowerDemand;

    const output: SimulationResultDto = {
      theoriticalMaxPowerDemand,
      actualMaxPowerDemand: maxPowerDemand,
      totalEnergyConsumed: +totalEnergyConsumed.toFixed(),
      concurrencyFactor: +concurrencyFactor.toFixed(2),
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
  getArrivalProbability(intervalIndex: number): number {
    const intervalsPerHour = 4;
    const hourIndex = Math.floor(intervalIndex / intervalsPerHour); // Determine which hour the interval belongs to
    const hourProbability = evArrivalProbabilities[hourIndex % 24].probability; // Use the probability for the corresponding hour
    const probability = hourProbability / intervalsPerHour; // Divide the hourly probability evenly among the four 15-minute intervals
    const decimalProbability = probability / 100; // convert it to decimal to compare it with math.rano()
    return decimalProbability;
  }

  /**
   * Convert km range to energy needed in kWh
   *  */
  calculateEnergyRequired(kmRange: number): number {
    return +((kmRange / 100) * 18).toFixed(2);
  }
}
