import * as Joi from 'joi';

export class TattooArtistSchema {
  static artistName = Joi.string().min(1);
}
