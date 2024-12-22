// creating BookingService
import { Injectable } from '@nestjs/common';
import { BookingDTO } from 'src/common/classes/DTOs/booking/BookingDTO';
import { BarberRepository } from 'src/repositories/BarberRepository';

@Injectable()
export class BookingService {
  constructor(private readonly barberRepository: BarberRepository) {}

  async findAll() {
    return this.barberRepository.findAllBookings();
  }

  async update(barberId: number, updateBookingDto: BookingDTO) {
    return this.barberRepository.updateBooking(barberId, updateBookingDto);
  }

  async findOne(id: number) {
    return this.barberRepository.findBookingsByBarber(id);
  }

  async delete(id: number) {
    return await this.barberRepository.delete(id);
  }
}
