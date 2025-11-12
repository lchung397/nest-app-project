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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractSchema = void 0;
const typeorm_1 = require("typeorm");
const user_schema_1 = require("./user.schema");
let ContractSchema = class ContractSchema {
    id;
    title;
    description;
    startDate;
    endDate;
    value;
    status;
    userId;
    user;
    createdAt;
    updatedAt;
};
exports.ContractSchema = ContractSchema;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ContractSchema.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContractSchema.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], ContractSchema.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ContractSchema.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ContractSchema.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 15, scale: 2 }),
    __metadata("design:type", Number)
], ContractSchema.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['DRAFT', 'ACTIVE', 'EXPIRED', 'TERMINATED'],
        default: 'DRAFT'
    }),
    __metadata("design:type", String)
], ContractSchema.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ContractSchema.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_schema_1.UserSchema),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_schema_1.UserSchema)
], ContractSchema.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], ContractSchema.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], ContractSchema.prototype, "updatedAt", void 0);
exports.ContractSchema = ContractSchema = __decorate([
    (0, typeorm_1.Entity)('contracts')
], ContractSchema);
//# sourceMappingURL=contract.schema.js.map