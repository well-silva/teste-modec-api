import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Param,
  Query,
} from '@nestjs/common';
import { ContractsServices } from './contracts.service';
import { GetContractsDto } from './dtos/get-contracts.dto';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsServices, // Ensure this is the correct service type
  ) {}

  @Get()
  findAll(
    @Query()
    params: GetContractsDto,
  ) {
    const {
      page,
      limit,
      search,
      supplier,
      status,
      category,
      startDate,
      endDate,
    } = params;

    return this.contractsService.findAll({
      category,
      status,
      startDate,
      endDate,
      page,
      limit,
      search,
      supplier,
    });
  }

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    const {
      supplier,
      amount,
      category,
      startDate,
      endDate,
      description,
      responsible,
      status,
    } = createContractDto;

    return this.contractsService.create({
      supplier,
      amount,
      category,
      startDate,
      endDate,
      description,
      responsible,
      status,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(+id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(+id);
  }
}
