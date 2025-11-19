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
exports.GetContractUseCase = void 0;
const common_1 = require("@nestjs/common");
const contract_repository_interface_1 = require("../../domain/repositories/contract.repository.interface");
let GetContractUseCase = class GetContractUseCase {
    contractRepository;
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async execute(userId, contractId) {
        const contract = await this.contractRepository.findById(contractId);
        if (!contract) {
            throw new common_1.NotFoundException("Contract not found");
        }
        if (contract.userId !== userId) {
            throw new common_1.ForbiddenException("You can only view your own contracts");
        }
        return contract;
    }
};
exports.GetContractUseCase = GetContractUseCase;
exports.GetContractUseCase = GetContractUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(contract_repository_interface_1.IContractRepository)),
    __metadata("design:paramtypes", [Object])
], GetContractUseCase);
//# sourceMappingURL=get-contract.use-case.js.map