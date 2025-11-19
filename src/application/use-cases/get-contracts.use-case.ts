import { Injectable, Inject } from '@nestjs/common';
import { IContractRepository } from '../../domain/repositories/contract.repository.interface';

@Injectable()
export class GetContractsUseCase {
  constructor(
    @Inject(IContractRepository)
    private readonly contractRepository: IContractRepository,
  ) {}

  async execute(userId: string) {
    console.log("-------------------", 11111);
    return await this.contractRepository.findByUserId(userId);
  }
}
