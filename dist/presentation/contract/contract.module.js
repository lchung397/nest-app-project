"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contract_controller_1 = require("./contract.controller");
const contract_schema_1 = require("../../infrastructure/database/typeorm/contract.schema");
const contract_repository_1 = require("../../infrastructure/database/repositories/contract.repository");
const contract_repository_interface_1 = require("../../domain/repositories/contract.repository.interface");
const create_contract_use_case_1 = require("../../application/use-cases/create-contract.use-case");
const update_contract_use_case_1 = require("../../application/use-cases/update-contract.use-case");
const get_contract_use_case_1 = require("../../application/use-cases/get-contract.use-case");
const get_contracts_use_case_1 = require("../../application/use-cases/get-contracts.use-case");
let ContractModule = class ContractModule {
};
exports.ContractModule = ContractModule;
exports.ContractModule = ContractModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([contract_schema_1.ContractSchema])],
        controllers: [contract_controller_1.ContractController],
        providers: [
            {
                provide: contract_repository_interface_1.IContractRepository,
                useClass: contract_repository_1.ContractRepository,
            },
            create_contract_use_case_1.CreateContractUseCase,
            update_contract_use_case_1.UpdateContractUseCase,
            get_contract_use_case_1.GetContractUseCase,
            get_contracts_use_case_1.GetContractsUseCase,
        ],
        exports: [contract_repository_interface_1.IContractRepository],
    })
], ContractModule);
//# sourceMappingURL=contract.module.js.map