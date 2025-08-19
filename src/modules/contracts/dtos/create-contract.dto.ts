import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsDateString,
  MaxLength,
  MinLength,
  IsIn,
} from 'class-validator';

export class CreateContractDto {
  @IsString({ message: 'Fornecedor deve ser uma string' })
  @IsNotEmpty({ message: 'Fornecedor é obrigatório' })
  @MinLength(2, { message: 'Fornecedor deve ter pelo menos 2 caracteres' })
  @MaxLength(200, { message: 'Fornecedor deve ter no máximo 200 caracteres' })
  supplier: string;

  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount: number;

  @IsString({ message: 'Categoria deve ser uma string' })
  @IsNotEmpty({ message: 'Categoria é obrigatória' })
  @MinLength(2, { message: 'Categoria deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Categoria deve ter no máximo 100 caracteres' })
  category: string;

  @IsString({ message: 'Status deve ser uma string' })
  @IsNotEmpty({ message: 'Status é obrigatório' })
  @IsIn(['active', 'pending', 'completed', 'cancelled', 'expired'], {
    message: 'Status deve ser: active, pending, completed ou cancelled',
  })
  status: string;

  @IsDateString(
    {},
    {
      message: 'Data de início deve ser uma data válida (formato: YYYY-MM-DD)',
    },
  )
  @IsNotEmpty({ message: 'Data de início é obrigatória' })
  startDate: string;

  @IsDateString(
    {},
    { message: 'Data de fim deve ser uma data válida (formato: YYYY-MM-DD)' },
  )
  @IsNotEmpty({ message: 'Data de fim é obrigatória' })
  endDate: string;

  @IsString({ message: 'Descrição deve ser uma string' })
  @IsNotEmpty({ message: 'Descrição é obrigatória' })
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  @MaxLength(1000, { message: 'Descrição deve ter no máximo 1000 caracteres' })
  description: string;

  @IsString({ message: 'Responsável deve ser uma string' })
  @IsNotEmpty({ message: 'Responsável é obrigatório' })
  @MinLength(2, { message: 'Responsável deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Responsável deve ter no máximo 100 caracteres' })
  responsible: string;
}
