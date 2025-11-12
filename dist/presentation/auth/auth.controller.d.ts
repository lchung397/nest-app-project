import { SignUpDto } from '../../application/dto/signup.dto';
import { SignInDto } from '../../application/dto/signin.dto';
import { SignUpUseCase } from '../../application/use-cases/signup.use-case';
import { SignInUseCase } from '../../application/use-cases/signin.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
export declare class AuthController {
    private readonly signUpUseCase;
    private readonly signInUseCase;
    private readonly getUserUseCase;
    constructor(signUpUseCase: SignUpUseCase, signInUseCase: SignInUseCase, getUserUseCase: GetUserUseCase);
    signUp(signUpDto: SignUpDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    signIn(signInDto: SignInDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            name: string;
        };
    }>;
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
