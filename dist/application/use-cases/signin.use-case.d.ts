import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { SignInDto } from '../dto/signin.dto';
export declare class SignInUseCase {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JwtService);
    execute(signInDto: SignInDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
}
