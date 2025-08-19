import { NestFactory } from '@nestjs/core';
import { ContractSeeder } from './infra/database/seeds/contract.seed';
import { AppModule } from './app.module';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const seeder = app.get<ContractSeeder>(ContractSeeder);
    await seeder.seed();
    console.log('🌱 Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

runSeed();
