import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateUserDTO } from 'src/common/classes/DTOs/users/CreateUserDTO';
import { UsersService } from 'src/services/UsersService';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @UsePipes(new JoiPipe())
  async create(@Body() createUserDto: CreateUserDTO) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  //   @Put(':id')
  //   async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //     return this.usersService.update(+id, updateUserDto);
  //   }

  //   @Delete(':id')
  //   async remove(@Param('id') id: string) {
  //     return this.usersService.remove(+id);
  //   }
}
