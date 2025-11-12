import { IUserRepository } from '../../domain/repositories/user.repository.interface';
export declare class GetUserUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    execute(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }>;
}
