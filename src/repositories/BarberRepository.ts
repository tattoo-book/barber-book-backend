import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingDTO } from 'src/common/classes/DTOs/booking/BookingDTO';
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

  async updateBooking(barberId: number, updateBookingDto: BookingDTO) {
    const barber = await this.BarberRepository.findOneBy({ id: barberId });
    if (!barber) throw new NotFoundException(`Barber with id ${barberId} not found`);

    barber.setBookings(updateBookingDto);
    return await this.BarberRepository.save(barber);
  }

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

  async findBookingsByBarber(id: number) {
    const barber = await this.BarberRepository.findOneBy({ id });
    if (!barber) throw new NotFoundException(`Barber with id ${id} not found`);
    return { id: barber.id, name: barber.name, bookings: barber.bookings };
  }

  async findAllBookings() {
    return await this.BarberRepository.find({ select: { id: true, name: true, bookings: {} } });
  }

  async delete(id: number) {
    return await this.BarberRepository.softRemove({ id });
  }
}
