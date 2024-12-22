import * as Joi from 'joi';

export class BookingSchema {
  static start = Joi.string();
  static end = Joi.string();
  static bookingTimes = Joi.object({ start: BookingSchema.start, end: BookingSchema.end });
  static daysWeek = Joi.array().items(BookingSchema.bookingTimes);
}
