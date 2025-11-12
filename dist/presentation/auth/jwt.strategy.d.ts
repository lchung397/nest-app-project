import { Strategy } from 'passport-jwt';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    validate(payload: any): Promise<{
        userId: any;
        email: any;
    }>;
}
export {};
