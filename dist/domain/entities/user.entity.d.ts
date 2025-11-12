export declare class User {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    constructor(partial: Partial<User>);
    validatePassword(password: string): boolean;
    validateEmail(email: string): boolean;
}
