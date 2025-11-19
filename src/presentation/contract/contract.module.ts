import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContractController } from "./contract.controller";
import { ContractSchema } from "../../infrastructure/database/typeorm/contract.schema";
import { ContractRepository } from "../../infrastructure/database/repositories/contract.repository";
import { IContractRepository } from "../../domain/repositories/contract.repository.interface";
import { CreateContractUseCase } from "../../application/use-cases/create-contract.use-case";
import { UpdateContractUseCase } from "src/application/use-cases/update-contract.use-case";
import { GetContractUseCase } from "src/application/use-cases/get-contract.use-case";
import { GetContractsUseCase } from "src/application/use-cases/get-contracts.use-case";

@Module({
  imports: [TypeOrmModule.forFeature([ContractSchema])],
  controllers: [ContractController],
  providers: [
    {
      provide: IContractRepository,
      useClass: ContractRepository,
    },
    CreateContractUseCase,
    UpdateContractUseCase,
    GetContractUseCase,
    GetContractsUseCase,
  ],
  exports: [IContractRepository],
})
export class ContractModule {}
