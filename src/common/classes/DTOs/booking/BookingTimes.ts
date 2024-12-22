import { JoiSchema } from 'nestjs-joi';
import { BookingSchema } from 'src/common/joi/schemas/bookings/Booking';

export class BookingTimes {
  @JoiSchema(BookingSchema.start.required())
  start: string;

  @JoiSchema(BookingSchema.end.required())
  end: string;
}
