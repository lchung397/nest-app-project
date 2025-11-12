import { IContractRepository } from '../../domain/repositories/contract.repository.interface';
import { CreateContractDto } from '../dto/create-contract.dto';
export declare class CreateContractUseCase {
    private readonly contractRepository;
    constructor(contractRepository: IContractRepository);
    execute(userId: string, dto: CreateContractDto): Promise<import("../../domain/entities/contract.entity").Contract>;
}
