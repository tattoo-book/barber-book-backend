// Create BarberController crud
import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/common/classes/DTOs/RequestDTO';
import { ResponseDTO } from 'src/common/classes/DTOs/ResponseDTO';
import { ResponseErrorDTO } from 'src/common/classes/DTOs/ResponseErrorDTO';
import { CreateBarberDTO } from 'src/common/classes/DTOs/tattoo-artists/CreateBarberDTO';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { ErrorHandler } from 'src/common/handlers/ErrorHandler';
import { BarberService } from 'src/services/BarberService';

@Controller('barbers')
@UseGuards(AuthGuard)
export class BarberController {
  static logger = new Logger('BarberController');

  constructor(private BarberService: BarberService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Req() req: RequestDTO, @Body() createBarberDto: CreateBarberDTO) {
    try {
      const Barber = await this.BarberService.create(createBarberDto, req.user.id);
      return ResponseDTO.OK('Success on create barber', Barber);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberController.logger, 'Failed on create barber', error);
      return new ResponseErrorDTO(error.status, 'Failed on create barber', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const Barbers = await this.BarberService.findAll();
      return ResponseDTO.OK('Success on find all barber', Barbers);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberController.logger, 'Failed on find all barber', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all barber', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const Barber = await this.BarberService.findOne(+id);
      return ResponseDTO.OK(`Success on find barber with id ${id}`, Barber);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberController.logger, 'Failed in list barber', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all barber', errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      const Barber = await this.BarberService.delete(+id);
      return ResponseDTO.OK(`Success on delete barber with id ${id}`, Barber);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberController.logger, `Failed on delete barber with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on delete barber with id ${id}`, errorDescription);
    }
  }
}
