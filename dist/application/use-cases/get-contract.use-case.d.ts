import { IContractRepository } from "../../domain/repositories/contract.repository.interface";
export declare class GetContractUseCase {
    private readonly contractRepository;
    constructor(contractRepository: IContractRepository);
    execute(userId: string, contractId: string): Promise<import("../../domain/entities/contract.entity").Contract>;
}
