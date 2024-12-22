import { JoiSchema } from 'nestjs-joi';
import { BookingSchema } from 'src/common/joi/schemas/bookings/Booking';
import { BookingTimes } from './BookingTimes';

export class BookingDTO {
  @JoiSchema(BookingSchema.daysWeek.required())
  sunday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  monday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  tuesday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  wednesday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  thursday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  friday: BookingTimes[];

  @JoiSchema(BookingSchema.daysWeek.required())
  saturday: BookingTimes[];
}
