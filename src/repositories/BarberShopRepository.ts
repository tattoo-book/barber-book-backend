// create BarberShops repositories
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBarberShopDTO } from 'src/common/classes/DTOs/studios/CreateStudioDTO';
import { BarberShopsEntity } from 'src/entities/BarberShopsEntity';
import { Repository } from 'typeorm';

@Injectable()
export class BarberShopsRepository {
  constructor(@InjectRepository(BarberShopsEntity) private readonly BarberShopsRepository: Repository<BarberShopsEntity>) {}

  async create(createBarberShopDto: CreateBarberShopDTO, userId: number) {
    const barberShopEntity = this.BarberShopsRepository.create({ ...createBarberShopDto, ownerId: userId });
    return await this.BarberShopsRepository.save(barberShopEntity);
  }

  async findAll() {
    return await this.BarberShopsRepository.find();
  }

  async findOne(id: number) {
    const barberShop = await this.BarberShopsRepository.findOneBy({ id });
    if (!barberShop) throw new NotFoundException(`BarberShop with id ${id} not found`);
    return barberShop;
  }

  async delete(id: number, userId: number) {
    const barberShop = await this.BarberShopsRepository.findOne({ where: { id: id } });
    if (!barberShop) throw new NotFoundException(`Barber shop ${id} not found`);
    if (barberShop.ownerId !== userId) throw new ForbiddenException('Only owners can delete BarberShop');
    return await this.BarberShopsRepository.softRemove(barberShop);
  }
}
