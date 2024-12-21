import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTattooArtistDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateTattooArtistDTO';
import { RolesEnum } from 'src/common/enums/RolesEnum';
import { TattooArtistEntity } from 'src/entities/TattooArtistEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TattooArtistRepository {
  constructor(
    @InjectRepository(TattooArtistEntity) private readonly tattooArtistRepository: Repository<TattooArtistEntity>,
    private readonly datasource: DataSource,
  ) {}

  async create(createTattooArtistDto: CreateTattooArtistDTO, userID: number) {
    const userIsTattooArtist = await this.tattooArtistRepository.findOne({ where: { userId: userID } });
    if (userIsTattooArtist) throw new ConflictException('User is tattoo artist');

    const result = await this.datasource.transaction(async (manager) => {
      const user = await manager.findOne(UsersEntity, { where: { id: userID } });
      user.setRoles([...user.roles, RolesEnum.TATTOO_ARTIST]);

      const tattooArtistEntity = this.tattooArtistRepository.create({ ...createTattooArtistDto, userId: userID });
      await manager.save(user);
      return await manager.save(TattooArtistEntity, tattooArtistEntity);
    });

    return result;
  }

  async findAll() {
    return await this.tattooArtistRepository.find();
  }

  async findOne(id: number) {
    return await this.tattooArtistRepository.findOneBy({ id });
  }

  async delete(id: number) {
    return await this.tattooArtistRepository.delete({ id });
  }
}
