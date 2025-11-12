import { CreateContractDto } from '../../application/dto/create-contract.dto';
import { CreateContractUseCase } from '../../application/use-cases/create-contract.use-case';
import { UpdateContractDto } from 'src/application/dto/update-contract.dto';
import { UpdateContractUseCase } from 'src/application/use-cases/update-contract.use-case';
export declare class ContractController {
    private readonly createContractUseCase;
    private readonly updateContractUseCase;
    constructor(createContractUseCase: CreateContractUseCase, updateContractUseCase: UpdateContractUseCase);
    create(req: any, dto: CreateContractDto): Promise<import("../../domain/entities/contract.entity").Contract>;
    findAll(req: any): Promise<void>;
    findOne(req: any, id: string): Promise<void>;
    update(req: any, id: string, dto: UpdateContractDto): Promise<void>;
    remove(req: any, id: string): Promise<void>;
}
