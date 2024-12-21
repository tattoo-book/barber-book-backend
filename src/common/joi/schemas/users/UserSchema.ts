import * as Joi from 'joi';

export class UserSchema {
  static email = Joi.string();
  static password = Joi.string();
}
