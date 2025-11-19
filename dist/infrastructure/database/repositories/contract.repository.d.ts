import { Repository } from "typeorm";
import { IContractRepository } from "../../../domain/repositories/contract.repository.interface";
import { Contract } from "../../../domain/entities/contract.entity";
import { ContractSchema } from "../typeorm/contract.schema";
export declare class ContractRepository implements IContractRepository {
    private readonly contractRepository;
    constructor(contractRepository: Repository<ContractSchema>);
    findById(id: string): Promise<Contract | null>;
    findByUserId(userId: string): Promise<Contract[]>;
    findAll(): Promise<Contract[]>;
    create(contract: Partial<Contract>): Promise<Contract>;
    update(id: string, contract: Partial<Contract>): Promise<Contract>;
    delete(id: string): Promise<void>;
    private toDomain;
}
