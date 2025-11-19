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
exports.ContractRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contract_entity_1 = require("../../../domain/entities/contract.entity");
const contract_schema_1 = require("../typeorm/contract.schema");
let ContractRepository = class ContractRepository {
    contractRepository;
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async findById(id) {
        const contractSchema = await this.contractRepository.findOne({
            where: { id },
        });
        return contractSchema ? this.toDomain(contractSchema) : null;
    }
    async findByUserId(userId) {
        const contracts = await this.contractRepository.find({ where: { userId } });
        return contracts.map((c) => this.toDomain(c));
    }
    async findAll() {
        const contracts = await this.contractRepository.find();
        return contracts.map((c) => this.toDomain(c));
    }
    async create(contract) {
        const contractSchema = this.contractRepository.create(contract);
        const savedContract = await this.contractRepository.save(contractSchema);
        return this.toDomain(savedContract);
    }
    async update(id, contract) {
        const existingContract = await this.contractRepository.findOne({
            where: { id },
        });
        if (!existingContract) {
            throw new common_1.NotFoundException("Contract not found");
        }
        Object.assign(existingContract, contract);
        const updatedContract = await this.contractRepository.save(existingContract);
        return this.toDomain(updatedContract);
    }
    async delete(id) {
        const result = await this.contractRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException("Contract not found");
        }
    }
    toDomain(contractSchema) {
        return new contract_entity_1.Contract({
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
};
exports.ContractRepository = ContractRepository;
exports.ContractRepository = ContractRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contract_schema_1.ContractSchema)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContractRepository);
//# sourceMappingURL=contract.repository.js.map