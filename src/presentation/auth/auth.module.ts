import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from '../../infrastructure/database/typeorm/user.schema';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { SignUpUseCase } from '../../application/use-cases/signup.use-case';
import { SignInUseCase } from '../../application/use-cases/signin.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET') || 'your-secret-key-change-in-production',
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: IUserRepository,
      useClass: UserRepository,
    },
    SignUpUseCase,
    SignInUseCase,
    GetUserUseCase,
    JwtStrategy,
  ],
  exports: [IUserRepository],
})
export class AuthModule {}
