// Create BarberService crud
import { Injectable } from '@nestjs/common';
import { CreateBarberDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateBarberDTO';
import { BarberRepository } from 'src/repositories/BarberRepository';

@Injectable()
export class BarberService {
  constructor(private readonly BarberRepository: BarberRepository) {}

  async create(createBarberDto: CreateBarberDTO, userID: number) {
    return await this.BarberRepository.create(createBarberDto, userID);
  }

  async findAll() {
    return this.BarberRepository.findAll();
  }

  async findOne(id: number) {
    return this.BarberRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.BarberRepository.delete(id);
  }
}
