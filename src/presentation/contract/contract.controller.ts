import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateContractDto } from '../../application/dto/create-contract.dto';
import { CreateContractUseCase } from '../../application/use-cases/create-contract.use-case';
import { UpdateContractDto } from 'src/application/dto/update-contract.dto';
import { UpdateContractUseCase } from 'src/application/use-cases/update-contract.use-case';

@Controller('contracts')
@UseGuards(JwtAuthGuard)  // Protect all routes
export class ContractController {
  constructor(
    private readonly createContractUseCase: CreateContractUseCase,
    private readonly updateContractUseCase: UpdateContractUseCase
    // Inject các use cases khác...
  ) { }

  @Post()
  async create(@Request() req, @Body() dto: CreateContractDto) {
    return this.createContractUseCase.execute(req.user.userId, dto);
  }

  @Get()
  async findAll(@Request() req) {
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
  }

  @Put(':id')
  async update(@Request() req, @Param('id') id: string, @Body() dto: UpdateContractDto) {
    this.updateContractUseCase.execute(req.user.userId, id, dto)
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id') id: string) {
  }
}
