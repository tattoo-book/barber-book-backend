import * as Joi from 'joi';

export class BookingSchema {
  static timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
  static start = Joi.string().pattern(BookingSchema.timePattern);
  static end = Joi.string().pattern(BookingSchema.timePattern);

  static bookingTimes = Joi.object({
    start: BookingSchema.start.required(),
    end: BookingSchema.end.required(),
  }).custom((value, helpers) => {
    const startTime = value.start;
    const endTime = value.end;

    const startDate = new Date(`1970-01-01T${startTime}:00`);
    const endDate = new Date(`1970-01-01T${endTime}:00`);

    if (startDate >= endDate) return helpers.error('any.invalid', { message: 'Start time must be less than end time' });
    return value; // Return the value if validation passes
  });
  static daysWeek = Joi.array().items(BookingSchema.bookingTimes);
}