// create studios repositories
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudioDTO } from 'src/common/classes/DTOs/studios/CreateStudioDTO';
import { StudiosEntity } from 'src/entities/StudiosEntity';
import { Repository } from 'typeorm';

@Injectable()
export class StudiosRepository {
  constructor(@InjectRepository(StudiosEntity) private readonly studiosRepository: Repository<StudiosEntity>) {}

  async create(createStudioDto: CreateStudioDTO, userId: number) {
    const studioEntity = this.studiosRepository.create({ ...createStudioDto, ownerId: userId });
    return await this.studiosRepository.save(studioEntity);
  }

  async findAll() {
    return await this.studiosRepository.find();
  }

  async findOne(id: number) {
    const studio = await this.studiosRepository.findOneBy({ id });
    if (!studio) throw new NotFoundException(`Studio with id ${id} not found`);
    return studio;
  }

  async delete(id: number, userId: number) {
    const studio = await this.studiosRepository.findOne({ where: { id: id } });
    if (studio.ownerId !== userId) throw new ForbiddenException('Only owners can delete studio');
    return await this.studiosRepository.softRemove(studio);
  }
}
