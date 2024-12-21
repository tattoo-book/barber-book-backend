// Create TattooArtistService crud
import { Injectable } from '@nestjs/common';
import { CreateTattooArtistDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateTattooArtistDTO';
import { TattooArtistRepository } from 'src/repositories/TattooArtistRepository';

@Injectable()
export class TattooArtistService {
  constructor(private readonly tattooArtistRepository: TattooArtistRepository) {}

  async create(createTattooArtistDto: CreateTattooArtistDTO, userID: number) {
    return await this.tattooArtistRepository.create(createTattooArtistDto, userID);
  }

  async findAll() {
    return this.tattooArtistRepository.findAll();
  }

  async findOne(id: number) {
    return this.tattooArtistRepository.findOne(id);
  }

  async delete(id: number) {
    return await this.tattooArtistRepository.delete(id);
  }
}
