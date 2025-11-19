import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { IContractRepository } from "../../../domain/repositories/contract.repository.interface";
import { Contract } from "../../../domain/entities/contract.entity";
import { ContractSchema } from "../typeorm/contract.schema";

@Injectable()
export class ContractRepository implements IContractRepository {
  constructor(
    @InjectRepository(ContractSchema)
    private readonly contractRepository: Repository<ContractSchema>,
  ) {}

  async findById(id: string): Promise<Contract | null> {
    const contractSchema = await this.contractRepository.findOne({
      where: { id },
    });
    return contractSchema ? this.toDomain(contractSchema) : null;
  }

  async findByUserId(userId: string): Promise<Contract[]> {
    const contracts = await this.contractRepository.find({ where: { userId } });
    return contracts.map((c) => this.toDomain(c));
  }

  async findAll(): Promise<Contract[]> {
    const contracts = await this.contractRepository.find();
    return contracts.map((c) => this.toDomain(c));
  }

  async create(contract: Partial<Contract>): Promise<Contract> {
    const contractSchema = this.contractRepository.create(contract);
    const savedContract = await this.contractRepository.save(contractSchema);
    return this.toDomain(savedContract);
  }

  async update(id: string, contract: Partial<Contract>): Promise<Contract> {
    const existingContract = await this.contractRepository.findOne({
      where: { id },
    });
    if (!existingContract) {
      throw new NotFoundException("Contract not found");
    }

    Object.assign(existingContract, contract);
    const updatedContract =
      await this.contractRepository.save(existingContract);
    return this.toDomain(updatedContract);
  }

  async delete(id: string): Promise<void> {
    const result = await this.contractRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException("Contract not found");
    }
  }

  private toDomain(contractSchema: ContractSchema): Contract {
    return new Contract({
      id: contractSchema.id,
      title: contractSchema.title,
      description: contractSchema.description,
      startDate: contractSchema.startDate,
      endDate: contractSchema.endDate,
      value: Number(contractSchema.value),
      status: contractSchema.status,
      userId: contractSchema.userId,
      createdAt: contractSchema.createdAt,
      updatedAt: contractSchema.updatedAt,
    });
  }
}
