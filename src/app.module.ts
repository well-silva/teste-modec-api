import { Module } from '@nestjs/common';
import { ContractsModule } from './modules/contracts/contracts.module';
import { SeedModule } from './infra/database/seed.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, ContractsModule, SeedModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
