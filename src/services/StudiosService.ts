// create BarberShopservice crud
import { Injectable } from '@nestjs/common';
import { CreateBarberShopDTO } from 'src/common/classes/DTOs/studios/CreateStudioDTO';
import { BarberShopsRepository } from 'src/repositories/BarberShopRepository';

@Injectable()
export class BarberShopsService {
  constructor(private readonly BarberShopsRepository: BarberShopsRepository) {}

  async create(createBarberShopDto: CreateBarberShopDTO, userId: number) {
    return await this.BarberShopsRepository.create(createBarberShopDto, userId);
  }

  async findAll() {
    return this.BarberShopsRepository.findAll();
  }

  async findOne(id: number) {
    return this.BarberShopsRepository.findOne(id);
  }

  async delete(id: number, userId: number) {
    return await this.BarberShopsRepository.delete(id, userId);
  }
}
