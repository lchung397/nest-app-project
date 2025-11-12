import { UserSchema } from './user.schema';
export declare class ContractSchema {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    value: number;
    status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
    userId: string;
    user: UserSchema;
    createdAt: Date;
    updatedAt: Date;
}
