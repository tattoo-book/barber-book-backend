import { JoiSchema } from 'nestjs-joi';
import { TattooArtistSchema } from 'src/common/joi/schemas/tattoo-artists/TattooArtistSchema';

export class CreateTattooArtistDTO {
  @JoiSchema(TattooArtistSchema.artistName.required())
  name: string;
}
