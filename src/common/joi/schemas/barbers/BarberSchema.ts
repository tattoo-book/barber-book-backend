import * as Joi from 'joi';

export class BarberSchema {
  static artistName = Joi.string().min(1);
}
