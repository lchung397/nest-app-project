import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { CreateContractUseCase } from './create-contract.use-case';
import { IContractRepository } from '../../domain/repositories/contract.repository.interface';
import { CreateContractDto } from '../dto/create-contract.dto';
import { Contract } from '../../domain/entities/contract.entity';

describe('CreateContractUseCase', () => {
  let useCase: CreateContractUseCase;
  let mockRepository: jest.Mocked<IContractRepository>;

  beforeEach(async () => {
    mockRepository = {
      create: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateContractUseCase,
        {
          provide: IContractRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateContractUseCase>(CreateContractUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('execute', () => {
    const validDto: CreateContractDto = {
      title: 'Test Contract',
      description: 'Test Description',
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-12-31'),
      value: 50000,
      status: 'DRAFT',
    };

    it('should create contract successfully with valid data', async () => {
      const userId = 'user-123';
      const expectedContract = new Contract({
        id: 'contract-123',
        ...validDto,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockRepository.create.mockResolvedValue(expectedContract);

      const result = await useCase.execute(userId, validDto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...validDto,
        userId,
        status: 'DRAFT',
      });
      expect(result).toEqual(expectedContract);
    });

    it('should throw BadRequestException when end date is before start date', async () => {
      const invalidDto = {
        ...validDto,
        startDate: new Date('2025-12-31'),
        endDate: new Date('2025-01-01'),
      };

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        BadRequestException,
      );

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        'End date must be after start date',
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when value is negative', async () => {
      const invalidDto = {
        ...validDto,
        value: -1000,
      };

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        BadRequestException,
      );

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        'Contract value must be positive',
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException when value is zero', async () => {
      const invalidDto = {
        ...validDto,
        value: 0,
      };

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        BadRequestException,
      );

      await expect(useCase.execute('user-123', invalidDto)).rejects.toThrow(
        'Contract value must be positive',
      );

      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('should set status to DRAFT when status is not provided', async () => {
      const dtoWithoutStatus = {
        title: 'Test Contract',
        description: 'Test Description',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
        value: 50000,
      };

      const expectedContract = new Contract({
        id: 'contract-123',
        ...dtoWithoutStatus,
        status: 'DRAFT',
        userId: 'user-123',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      mockRepository.create.mockResolvedValue(expectedContract);

      await useCase.execute('user-123', dtoWithoutStatus);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...dtoWithoutStatus,
        userId: 'user-123',
        status: 'DRAFT',
      });
    });
  });
});
