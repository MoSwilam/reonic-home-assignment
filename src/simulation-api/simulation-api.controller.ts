import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SimulationApiService } from './simulation-api.service';
import { CreateSimulationApiDto } from './dto/create-simulation-api.dto';
import { UpdateSimulationApiDto } from './dto/update-simulation-api.dto';

@Controller('simulation-api')
export class SimulationApiController {
  constructor(private readonly simulationApiService: SimulationApiService) {}

  @Post()
  create(@Body() createSimulationApiDto: CreateSimulationApiDto) {
    return this.simulationApiService.create(createSimulationApiDto);
  }

  @Get()
  findAll() {
    return this.simulationApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simulationApiService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSimulationApiDto: UpdateSimulationApiDto) {
    return this.simulationApiService.update(id, updateSimulationApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.simulationApiService.remove(id);
  }
}
