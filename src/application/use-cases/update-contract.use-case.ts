import { Injectable, Inject, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { IContractRepository } from '../../domain/repositories/contract.repository.interface';
import { UpdateContractDto } from '../dto/update-contract.dto';

@Injectable()
export class UpdateContractUseCase {
  constructor(
    @Inject(IContractRepository)
    private readonly contractRepository: IContractRepository,
  ) {}

  async execute(userId: string, contractId: string, dto: UpdateContractDto) {
    const contract = await this.contractRepository.findById(contractId);
    
    if (!contract) {
      throw new NotFoundException('Contract not found');
    }

    if (contract.userId !== userId) {
      throw new ForbiddenException('You can only update your own contracts');
    }

    if (dto.startDate && dto.endDate && new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    if (dto.value !== undefined && dto.value <= 0) {
      throw new BadRequestException('Contract value must be positive');
    }

    const updatedContract = await this.contractRepository.update(contractId, dto);
    return updatedContract;
  }
}
