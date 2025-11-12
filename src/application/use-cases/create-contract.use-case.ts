import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { IContractRepository } from '../../domain/repositories/contract.repository.interface';
import { CreateContractDto } from '../dto/create-contract.dto';

@Injectable()
export class CreateContractUseCase {
  constructor(
    @Inject(IContractRepository)
    private readonly contractRepository: IContractRepository,
  ) {}

  async execute(userId: string, dto: CreateContractDto) {
    if (new Date(dto.startDate) >= new Date(dto.endDate)) {
      throw new BadRequestException('End date must be after start date');
    }

    if (dto.value <= 0) {
      throw new BadRequestException('Contract value must be positive');
    }

    const contract = await this.contractRepository.create({
      ...dto,
      userId,
      status: dto.status || 'DRAFT',
    });

    return contract;
  }
}
