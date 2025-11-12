"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const config_1 = require("@nestjs/config");
const auth_controller_1 = require("./auth.controller");
const jwt_strategy_1 = require("./jwt.strategy");
const user_schema_1 = require("../../infrastructure/database/typeorm/user.schema");
const user_repository_1 = require("../../infrastructure/database/repositories/user.repository");
const user_repository_interface_1 = require("../../domain/repositories/user.repository.interface");
const signup_use_case_1 = require("../../application/use-cases/signup.use-case");
const signin_use_case_1 = require("../../application/use-cases/signin.use-case");
const get_user_use_case_1 = require("../../application/use-cases/get-user.use-case");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_schema_1.UserSchema]),
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: (configService) => ({
                    secret: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
                    signOptions: { expiresIn: '24h' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            {
                provide: user_repository_interface_1.IUserRepository,
                useClass: user_repository_1.UserRepository,
            },
            signup_use_case_1.SignUpUseCase,
            signin_use_case_1.SignInUseCase,
            get_user_use_case_1.GetUserUseCase,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [user_repository_interface_1.IUserRepository],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map