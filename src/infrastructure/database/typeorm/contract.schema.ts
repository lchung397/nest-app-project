import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserSchema } from './user.schema';

@Entity('contracts')
export class ContractSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  value: number;

  @Column({ 
    type: 'enum', 
    enum: ['DRAFT', 'ACTIVE', 'EXPIRED', 'TERMINATED'], 
    default: 'DRAFT' 
  })
  status: 'DRAFT' | 'ACTIVE' | 'EXPIRED' | 'TERMINATED';

  @Column()
  userId: string;

  @ManyToOne(() => UserSchema)
  @JoinColumn({ name: 'userId' })
  user: UserSchema;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
