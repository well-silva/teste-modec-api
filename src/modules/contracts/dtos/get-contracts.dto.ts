import {
  IsOptional,
  IsNumber,
  IsString,
  IsPositive,
  IsDateString,
  Min,
  Max,
  MaxLength,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetContractsDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Página deve ser um número' })
  @IsPositive({ message: 'Página deve ser um número positivo' })
  @Min(1, { message: 'Página deve ser no mínimo 1' })
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: 'Limite deve ser um número' })
  @IsPositive({ message: 'Limite deve ser um número positivo' })
  @Min(1, { message: 'Limite deve ser no mínimo 1' })
  @Max(100, { message: 'Limite deve ser no máximo 100' })
  limit?: number;

  @IsOptional()
  @IsString({ message: 'Busca deve ser uma string' })
  @MaxLength(255, { message: 'Busca deve ter no máximo 255 caracteres' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'Fornecedor deve ser uma string' })
  @MaxLength(200, { message: 'Fornecedor deve ter no máximo 200 caracteres' })
  supplier?: string;

  @IsOptional()
  @IsString({ message: 'Status deve ser uma string' })
  @IsIn(['active', 'pending', 'completed', 'cancelled'], {
    message: 'Status deve ser: active, pending, completed ou cancelled',
  })
  status?: string;

  @IsOptional()
  @IsString({ message: 'Categoria deve ser uma string' })
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
}
