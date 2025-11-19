import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { IContractRepository } from "../../domain/repositories/contract.repository.interface";

@Injectable()
export class GetContractUseCase {
  constructor(
    @Inject(IContractRepository)
    private readonly contractRepository: IContractRepository,
  ) {}

  async execute(userId: string, contractId: string) {
    const contract = await this.contractRepository.findById(contractId);

    if (!contract) {
      throw new NotFoundException("Contract not found");
    }

    if (contract.userId !== userId) {
      throw new ForbiddenException("You can only view your own contracts");
    }

    return contract;
  }
}
