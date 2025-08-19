import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContractEntity } from './entity/contract.entity';
import { GetContractsDto } from './dtos/get-contracts.dto';
import { CreateContractDto } from './dtos/create-contract.dto';
import { UpdateContractDto } from './dtos/update-contract.dto';

@Injectable()
export class ContractsServices {
  constructor(
    @InjectRepository(ContractEntity)
    private readonly contractRepository: Repository<ContractEntity>,
  ) {}

  async findAll(params: GetContractsDto) {
    const {
      page,
      limit,
      search,
      supplier,
      status,
      category,
      endDate,
      startDate,
    } = params;

    const queryBuilder = this.contractRepository.createQueryBuilder('contract');

    // Seleciona as colunas necessárias
    queryBuilder.select([
      'contract.id',
      'contract.supplier',
      'contract.status',
      'contract.amount',
      'contract.category',
      'contract.startDate',
      'contract.endDate',
      'contract.description',
      'contract.responsible',
    ]);

    // Filtros específicos
    if (supplier) {
      queryBuilder.andWhere('contract.supplier = :supplier', { supplier });
    }

    if (status) {
      queryBuilder.andWhere('contract.status = :status', { status });
    }

    if (category) {
      queryBuilder.andWhere('contract.category = :category', { category });
    }

    if (startDate && endDate) {
      queryBuilder.andWhere(
        'contract.startDate >= :startDate AND contract.endDate <= :endDate',
        {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        },
      );
    }

    // Pesquisa em múltiplas colunas com OR
    if (search) {
      queryBuilder.andWhere(
        '(contract.description LIKE :search OR contract.supplier LIKE :search OR contract.responsible LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Paginação
    if (limit) {
      queryBuilder.take(limit);
    } else {
      queryBuilder.take(10);
    }

    if (page && limit) {
      queryBuilder.skip((page - 1) * limit);
    }

    const [contracts, total] = await queryBuilder.getManyAndCount();

    return {
      contracts,
      total,
    };
  }

  create(createContractDto: CreateContractDto) {
    const contract = this.contractRepository.create({
      amount: createContractDto.amount,
      category: createContractDto.category,
      description: createContractDto.description,
      endDate: new Date(createContractDto.endDate),
      responsible: createContractDto.responsible,
      startDate: new Date(createContractDto.startDate),
      supplier: createContractDto.supplier,
      status: createContractDto.status.toString(),
    });

    return this.contractRepository.save(contract);
  }

  async update(id: number, updateContractDto: UpdateContractDto) {
    // Verifica se o contrato existe
    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }

    // Prepara os dados para atualização, convertendo datas se fornecidas
    const updateData: any = { ...updateContractDto };
    if (updateContractDto.startDate) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.startDate = new Date(updateContractDto.startDate);
    }
    if (updateContractDto.endDate) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      updateData.endDate = new Date(updateContractDto.endDate).toDateString();
    }

    // Atualiza apenas os campos fornecidos
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const updatedContract = this.contractRepository.merge(contract, updateData);

    return this.contractRepository.save(updatedContract);
  }

  async findOne(id: number) {
    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }

    return contract;
  }

  async remove(id: number) {
    // Verifica se o contrato existe antes de deletar
    const contract = await this.contractRepository.findOne({ where: { id } });

    if (!contract) {
      throw new NotFoundException(`Contrato com ID ${id} não encontrado`);
    }

    // Remove o contrato
    await this.contractRepository.remove(contract);

    return {
      message: `Contrato com ID ${id} foi removido com sucesso`,
      removedContract: contract,
    };
  }
}
