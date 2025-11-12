export declare class Contract {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    value: number;
    status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(partial: Partial<Contract>);
    isActive(): boolean;
    canTerminate(): boolean;
    isExpired(): boolean;
}
