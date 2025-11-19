import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { CreateContractDto } from "../../application/dto/create-contract.dto";
import { CreateContractUseCase } from "../../application/use-cases/create-contract.use-case";
import { UpdateContractDto } from "src/application/dto/update-contract.dto";
import { UpdateContractUseCase } from "src/application/use-cases/update-contract.use-case";
import { GetContractUseCase } from "src/application/use-cases/get-contract.use-case";
import { GetContractsUseCase } from "src/application/use-cases/get-contracts.use-case";

@Controller("contracts")
@UseGuards(JwtAuthGuard) // Protect all routes
export class ContractController {
  constructor(
    private readonly createContractUseCase: CreateContractUseCase,
    private readonly updateContractUseCase: UpdateContractUseCase,
    private readonly getContractUseCase: GetContractUseCase,
    private readonly getContractsUseCase: GetContractsUseCase,
  ) {}

  @Post()
  async create(
    @Request() req: RequestWithUser,
    @Body() dto: CreateContractDto,
  ) {
    return this.createContractUseCase.execute(req.user.userId, dto);
  }

  @Get()
  async findAll(@Request() req: RequestWithUser) {
    return this.getContractsUseCase.execute(req.user.userId);
  }

  @Get(":id")
  async findOne(@Request() req: RequestWithUser, @Param("id") id: string) {
    return this.getContractUseCase.execute(req.user.userId, id);
  }

  @Put(":id")
  async update(
    @Request() req: RequestWithUser,
    @Param("id") id: string,
    @Body() dto: UpdateContractDto,
  ) {
    return this.updateContractUseCase.execute(req.user.userId, id, dto);
  }

  @Delete(":id")
  async remove(@Request() req: RequestWithUser, @Param("id") id: string) {
    return { message: "Not implemented yet" };
  }
}
