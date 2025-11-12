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
exports.ContractController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_contract_dto_1 = require("../../application/dto/create-contract.dto");
const create_contract_use_case_1 = require("../../application/use-cases/create-contract.use-case");
const update_contract_dto_1 = require("../../application/dto/update-contract.dto");
const update_contract_use_case_1 = require("../../application/use-cases/update-contract.use-case");
let ContractController = class ContractController {
    createContractUseCase;
    updateContractUseCase;
    constructor(createContractUseCase, updateContractUseCase) {
        this.createContractUseCase = createContractUseCase;
        this.updateContractUseCase = updateContractUseCase;
    }
    async create(req, dto) {
        return this.createContractUseCase.execute(req.user.userId, dto);
    }
    async findAll(req) {
    }
    async findOne(req, id) {
    }
    async update(req, id, dto) {
        this.updateContractUseCase.execute(req.user.userId, id, dto);
    }
    async remove(req, id) {
    }
};
exports.ContractController = ContractController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_contract_dto_1.CreateContractDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_contract_dto_1.UpdateContractDto]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ContractController.prototype, "remove", null);
exports.ContractController = ContractController = __decorate([
    (0, common_1.Controller)('contracts'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [create_contract_use_case_1.CreateContractUseCase,
        update_contract_use_case_1.UpdateContractUseCase])
], ContractController);
//# sourceMappingURL=contract.controller.js.map