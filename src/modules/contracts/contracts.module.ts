import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContractsController } from './contracts.controller';
import { ContractsServices } from './contracts.service';
import { ContractEntity } from './entity/contract.entity';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([ContractEntity])],
  controllers: [ContractsController],
  providers: [ContractsServices],
  exports: [ContractsServices],
})
export class ContractsModule {}
