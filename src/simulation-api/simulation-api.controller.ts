import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import {
  SimulationInputDto,
  UpdateSimulationApiDto,
} from '../common/dto/simulation.request.dto';
import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SimulationResponseDto } from '../common/dto/simulation.response.dto';
import { SimulationInputDocument } from './schemas/simulation-input.schema';
import { SimulationOutput } from './schemas/simulation-output.schema';
import { SimulationInputValidationInterceptor } from 'src/common/interceptors/simulation-input-validation.interceptor';

@ApiTags('Simulation API')
@Controller('api/simulation')
export class SimulationApiController {
  constructor(private readonly simulationApiService: SimulationApiService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Run simulation with custom input parameters' })
  @UseInterceptors(SimulationInputValidationInterceptor)
  create(
    @Body() createSimulationApiDto: SimulationInputDto,
  ): Promise<SimulationResponseDto> {
    return this.simulationApiService.create(createSimulationApiDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Get all simulation inputs' })
  findAll(): Promise<SimulationOutput[]> {
    return this.simulationApiService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a simulation input by Id' })
  @ApiOkResponse({
    type: SimulationResponseDto,
  })
  findOne(@Param('id') id: string): Promise<SimulationInputDocument> {
    return this.simulationApiService.findByIdOrThrow(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a simulation input by Id ' })
  @ApiOkResponse({
    type: SimulationResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateSimulationApiDto: UpdateSimulationApiDto,
  ): Promise<SimulationInputDocument> {
    return this.simulationApiService.update(id, updateSimulationApiDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a simulation input by Id' })
  remove(@Param('id') id: string) {
    return this.simulationApiService.remove(id);
  }
}
