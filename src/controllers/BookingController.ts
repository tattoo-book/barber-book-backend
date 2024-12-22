// create bookingcontroller and crud
import { Body, Controller, Get, Logger, Param, Put, UseGuards, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { BookingDTO } from 'src/common/classes/DTOs/booking/BookingDTO';
import { ResponseDTO } from 'src/common/classes/DTOs/ResponseDTO';
import { ResponseErrorDTO } from 'src/common/classes/DTOs/ResponseErrorDTO';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { ErrorHandler } from 'src/common/handlers/ErrorHandler';
import { BookingService } from 'src/services/BookingService';

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingController {
  static logger = new Logger('BookingController');

  constructor(private bookingService: BookingService) {}

  @Get()
  async findAll() {
    try {
      const bookings = await this.bookingService.findAll();
      return ResponseDTO.OK('Success on find all booking', bookings);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BookingController.logger, 'Failed on find all booking', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all booking', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const booking = await this.bookingService.findOne(+id);
      return ResponseDTO.OK(`Success on find booking with id ${id}`, booking);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BookingController.logger, `Failed on find booking with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on find booking with id ${id}`, errorDescription);
    }
  }

  @Put(':barberId')
  @UsePipes(new JoiPipe())
  async update(@Param('barberId') id: string, @Body() updateBookingDto: BookingDTO) {
    try {
      const booking = await this.bookingService.update(+id, updateBookingDto);
      return ResponseDTO.OK(`Success on update booking with id ${id}`, booking);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BookingController.logger, `Failed on update booking with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on update booking with id ${id}`, errorDescription);
    }
  }
}
