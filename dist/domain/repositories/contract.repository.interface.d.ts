import { Contract } from '../entities/contract.entity';
export interface IContractRepository {
    findById(id: string): Promise<Contract | null>;
    findByUserId(userId: string): Promise<Contract[]>;
    create(contract: Partial<Contract>): Promise<Contract>;
    update(id: string, contract: Partial<Contract>): Promise<Contract>;
    delete(id: string): Promise<void>;
}
export declare const IContractRepository: unique symbol;
