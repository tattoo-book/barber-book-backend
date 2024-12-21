import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/common/classes/DTOs/users/CreateUserDTO';
import { UsersEntity } from 'src/entities/UsersEntity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(UsersEntity) private readonly userRepository: Repository<UsersEntity>) {}

  async create(userCreateDTO: CreateUserDTO) {
    const emailAlreadyRegistered = await this.userRepository.findOne({ where: { email: userCreateDTO.email } });
    if (emailAlreadyRegistered) throw new BadRequestException('Email alredy registered');

    const userEntity = this.userRepository.create(userCreateDTO);
    return await this.userRepository.save(userEntity);
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async delete(id: number) {
    return await this.userRepository.softRemove({ id });
  }
}
