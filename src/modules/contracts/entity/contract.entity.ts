import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contracts')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  supplier: string;

  @Column()
  status: string;

  @Column()
  amount: number;

  @Column()
  category: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  description: string;

  @Column()
  responsible: string;
}
