// create BarberShopsCrontroller crud
import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { RequestDTO } from 'src/common/classes/DTOs/RequestDTO';
import { ResponseDTO } from 'src/common/classes/DTOs/ResponseDTO';
import { ResponseErrorDTO } from 'src/common/classes/DTOs/ResponseErrorDTO';
import { CreateBarberShopDTO } from 'src/common/classes/DTOs/studios/CreateStudioDTO';
import { AuthGuard } from 'src/common/guards/AuthGuard';
import { ErrorHandler } from 'src/common/handlers/ErrorHandler';
import { BarberShopsService } from 'src/services/StudiosService';

@Controller('barber-shops')
@UseGuards(AuthGuard)
export class BarberShopsController {
  static logger = new Logger('BarberShopsController');

  constructor(private BarberShopsService: BarberShopsService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Req() req: RequestDTO, @Body() createBarberShopDto: CreateBarberShopDTO) {
    try {
      const BarberShop = await this.BarberShopsService.create(createBarberShopDto, req.user.id);
      return ResponseDTO.OK('Success on create BarberShop', BarberShop);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberShopsController.logger, 'Failed on create BarberShop', error);
      return new ResponseErrorDTO(error.status, 'Failed on create BarberShop', errorDescription);
    }
  }

  @Get()
  async findAll() {
    try {
      const BarberShops = await this.BarberShopsService.findAll();
      return ResponseDTO.OK('Success on find all BarberShop', BarberShops);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberShopsController.logger, 'Failed on find all BarberShop', error);
      return new ResponseErrorDTO(error.status, 'Failed on find all BarberShop', errorDescription);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const BarberShop = await this.BarberShopsService.findOne(+id);
      return ResponseDTO.OK(`Success on find BarberShop with id ${id}`, BarberShop);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberShopsController.logger, `Failed on find BarberShop with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on find BarberShop with id ${id}`, errorDescription);
    }
  }

  @Delete(':id')
  async delete(@Req() req: RequestDTO, @Param('id') id: string) {
    try {
      const BarberShop = await this.BarberShopsService.delete(+id, req.user.id);
      return ResponseDTO.OK(`Success on delete BarberShop with id ${id}`, BarberShop);
    } catch (error) {
      const errorDescription = ErrorHandler.execute(BarberShopsController.logger, `Failed on delete BarberShop with id ${id}`, error);
      return new ResponseErrorDTO(error.status, `Failed on delete BarberShop with id ${id}`, errorDescription);
    }
  }
}
