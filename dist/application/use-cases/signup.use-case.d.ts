import { JwtService } from '@nestjs/jwt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { SignUpDto } from '../dto/signup.dto';
export declare class SignUpUseCase {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: IUserRepository, jwtService: JwtService);
    execute(signUpDto: SignUpDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
}
