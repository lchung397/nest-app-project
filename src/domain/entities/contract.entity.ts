export class Contract {
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

  constructor(partial: Partial<Contract>) {
    Object.assign(this, partial);
  }

  
  isActive(): boolean {
    const now = new Date();
    return this.status === 'ACTIVE' && 
           this.startDate <= now && 
           this.endDate >= now;
  }

  canTerminate(): boolean {
    return this.status === 'ACTIVE' || this.status === 'DRAFT';
  }

  isExpired(): boolean {
    return new Date() > this.endDate;
  }
}
