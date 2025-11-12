import { IContractRepository } from '../../domain/repositories/contract.repository.interface';
import { UpdateContractDto } from '../dto/update-contract.dto';
export declare class UpdateContractUseCase {
    private readonly contractRepository;
    constructor(contractRepository: IContractRepository);
    execute(userId: string, contractId: string, dto: UpdateContractDto): Promise<import("../../domain/entities/contract.entity").Contract>;
}
