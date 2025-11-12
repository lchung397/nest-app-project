export declare class UpdateContractDto {
    title?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
    value?: number;
    status?: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';
}
