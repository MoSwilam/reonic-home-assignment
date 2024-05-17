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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SimulationOutput } from './schemas/simulation-output.schema';
import { SimulationInputDocument } from './schemas/simulation-input.schema';
import { SimulationService } from './simulation.service';
import { SimulationInputDto, UpdateSimulationApiDto, SimulationResponseDto, SimulationInputValidationInterceptor } from '@reonic/common';


@ApiTags('Simulation API')
@Controller('api/simulation')
export class SimulationApiController {
  constructor(
    private readonly simulationApiService: SimulationApiService,
    private readonly simulationService: SimulationService
  ) {}

  @Get('/mock/run')
  @ApiOperation({ summary: 'Mock Simulation with default params' })
  mockSimulation(): Omit<SimulationOutput, '_id'> {
    return this.simulationService.runSimulation();
  }

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
