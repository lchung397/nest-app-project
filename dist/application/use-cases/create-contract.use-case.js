"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateContractUseCase = void 0;
const common_1 = require("@nestjs/common");
const contract_repository_interface_1 = require("../../domain/repositories/contract.repository.interface");
let CreateContractUseCase = class CreateContractUseCase {
    contractRepository;
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async execute(userId, dto) {
        if (new Date(dto.startDate) >= new Date(dto.endDate)) {
            throw new common_1.BadRequestException('End date must be after start date');
        }
        if (dto.value <= 0) {
            throw new common_1.BadRequestException('Contract value must be positive');
        }
        const contract = await this.contractRepository.create({
            ...dto,
            userId,
            status: dto.status || 'DRAFT',
        });
        return contract;
    }
};
exports.CreateContractUseCase = CreateContractUseCase;
exports.CreateContractUseCase = CreateContractUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contract_repository_interface_1.IContractRepository)),
    __metadata("design:paramtypes", [Object])
], CreateContractUseCase);
//# sourceMappingURL=create-contract.use-case.js.map