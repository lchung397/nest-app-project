import type { RequestWithUser } from "../auth/interfaces/request-with-user.interface";
import { CreateContractDto } from "../../application/dto/create-contract.dto";
import { CreateContractUseCase } from "../../application/use-cases/create-contract.use-case";
import { UpdateContractDto } from "src/application/dto/update-contract.dto";
import { UpdateContractUseCase } from "src/application/use-cases/update-contract.use-case";
import { GetContractUseCase } from "src/application/use-cases/get-contract.use-case";
import { GetContractsUseCase } from "src/application/use-cases/get-contracts.use-case";
export declare class ContractController {
    private readonly createContractUseCase;
    private readonly updateContractUseCase;
    private readonly getContractUseCase;
    private readonly getContractsUseCase;
    constructor(createContractUseCase: CreateContractUseCase, updateContractUseCase: UpdateContractUseCase, getContractUseCase: GetContractUseCase, getContractsUseCase: GetContractsUseCase);
    create(req: RequestWithUser, dto: CreateContractDto): Promise<import("../../domain/entities/contract.entity").Contract>;
    findAll(req: RequestWithUser): Promise<import("../../domain/entities/contract.entity").Contract[]>;
    findOne(req: RequestWithUser, id: string): Promise<import("../../domain/entities/contract.entity").Contract>;
    update(req: RequestWithUser, id: string, dto: UpdateContractDto): Promise<import("../../domain/entities/contract.entity").Contract>;
    remove(req: RequestWithUser, id: string): Promise<{
        message: string;
    }>;
}
