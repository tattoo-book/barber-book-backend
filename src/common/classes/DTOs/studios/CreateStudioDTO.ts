import { JoiSchema } from 'nestjs-joi';
import { BarberShopsSchema } from 'src/common/joi/schemas/studios/StudiosSchema';

export class CreateBarberShopDTO {
  @JoiSchema(BarberShopsSchema.BarberShopName.required())
  name: string;
}
