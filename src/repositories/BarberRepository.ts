import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBarberDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateBarberDTO';
import { RolesEnum } from 'src/common/enums/RolesEnum';
import { BarberEntity } from 'src/entities/BarberEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class BarberRepository {
  constructor(
    @InjectRepository(BarberEntity) private readonly BarberRepository: Repository<BarberEntity>,
    private readonly datasource: DataSource,
  ) {}

  async create(createBarberDto: CreateBarberDTO, userID: number) {
    const userIsBarber = await this.BarberRepository.findOne({ where: { userId: userID } });
    if (userIsBarber) throw new ConflictException('User is barber');

    const result = await this.datasource.transaction(async (manager) => {
      const user = await manager.findOne(UsersEntity, { where: { id: userID } });
      user.setRoles([...user.roles, RolesEnum.Barber]);

      const barberEntity = this.BarberRepository.create({ ...createBarberDto, userId: userID });
      await manager.save(user);
      return await manager.save(BarberEntity, barberEntity);
    });

    return result;
  }

  async findAll() {
    return await this.BarberRepository.find();
  }

  async findOne(id: number) {
    const user = await this.BarberRepository.findOneBy({ id });
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  async delete(id: number) {
    return await this.BarberRepository.softRemove({ id });
  }
}
