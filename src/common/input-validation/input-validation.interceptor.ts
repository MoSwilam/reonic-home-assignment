import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SimulationInputDto } from '../dto/simulation.request.dto';

@Injectable()
export class InputValidationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const payload: SimulationInputDto = request.body;

    const { arrivalProbabilityMultiplier: multiplier } = payload;

    if (!payload || !Object.keys(payload).length) {
      throw new BadRequestException('Either no payload or empty payload provided.');
    }

    for (const [key, value] of Object.entries(payload)) {
      if (!value || value <= 0) {
        throw new BadRequestException(
          `Invalid value provided for '${key}'. It must be a positive number.`,
        );
      }
    }

    if (!multiplier || multiplier <= 0 || multiplier > 200 || isNaN(multiplier)) {
      throw new BadRequestException(
        `Invalid value provided for 'arrivalProbabilityMultiplier'. It must be a positive number between 0 - 200.`,
      );
    }


    if (!Number.isInteger(multiplier)) {
      console.log({ multiplier: payload.arrivalProbabilityMultiplier });
    }


    return next.handle();
  }
}
