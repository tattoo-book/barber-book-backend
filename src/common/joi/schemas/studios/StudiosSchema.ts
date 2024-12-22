import * as Joi from 'joi';

export class BarberShopsSchema {
  static BarberShopName = Joi.string().min(1);
}
