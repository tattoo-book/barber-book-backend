import { JoiSchema } from 'nestjs-joi';
import { BarberSchema } from 'src/common/joi/schemas/barbers/BarberSchema';

export class CreateBarberDTO {
  @JoiSchema(BarberSchema.artistName.required())
  name: string;
}
