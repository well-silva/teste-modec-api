import {
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  MaxLength,
  MinLength,
  IsOptional,
  IsIn,
} from 'class-validator';

export class UpdateContractDto {
  @IsOptional()
  @IsString({ message: 'Fornecedor deve ser uma string' })
  @MinLength(2, { message: 'Fornecedor deve ter pelo menos 2 caracteres' })
  @MaxLength(200, { message: 'Fornecedor deve ter no máximo 200 caracteres' })
  supplier?: string;

  @IsOptional()
  @IsString({ message: 'Status deve ser uma string' })
  @IsIn(['active', 'pending', 'completed', 'cancelled'], {
    message: 'Status deve ser: active, pending, completed ou cancelled',
  })
  status?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Valor deve ser um número' })
  @IsPositive({ message: 'Valor deve ser positivo' })
  amount?: number;

  @IsOptional()
  @IsString({ message: 'Categoria deve ser uma string' })
  @MinLength(2, { message: 'Categoria deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Categoria deve ter no máximo 100 caracteres' })
  category?: string;

  @IsOptional()
  @IsDateString(
    {},
    {
      message: 'Data de início deve ser uma data válida (formato: YYYY-MM-DD)',
    },
  )
  startDate?: string;

  @IsOptional()
  @IsDateString(
    {},
    { message: 'Data de fim deve ser uma data válida (formato: YYYY-MM-DD)' },
  )
  endDate?: string;

  @IsOptional()
  @IsString({ message: 'Descrição deve ser uma string' })
  @MinLength(10, { message: 'Descrição deve ter pelo menos 10 caracteres' })
  @MaxLength(1000, { message: 'Descrição deve ter no máximo 1000 caracteres' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Responsável deve ser uma string' })
  @MinLength(2, { message: 'Responsável deve ter pelo menos 2 caracteres' })
  @MaxLength(100, { message: 'Responsável deve ter no máximo 100 caracteres' })
  responsible?: string;
}
