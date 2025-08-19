import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractEntity } from '../../modules/contracts/entity/contract.entity';
import { ContractSeeder } from './seeds/contract.seed';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  providers: [ContractSeeder],
  exports: [ContractSeeder],
})
export class SeedModule {}
