"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
class Contract {
    id;
    title;
    description;
    startDate;
    endDate;
    value;
    status;
    userId;
    createdAt;
    updatedAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
    isActive() {
        const now = new Date();
        return this.status === 'ACTIVE' &&
            this.startDate <= now &&
            this.endDate >= now;
    }
    canTerminate() {
        return this.status === 'ACTIVE' || this.status === 'DRAFT';
    }
    isExpired() {
        return new Date() > this.endDate;
    }
}
exports.Contract = Contract;
//# sourceMappingURL=contract.entity.js.map