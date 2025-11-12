"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    id;
    email;
    password;
    name;
    createdAt;
    constructor(partial) {
        Object.assign(this, partial);
    }
    validatePassword(password) {
        return !!password && password.length >= 6;
    }
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map