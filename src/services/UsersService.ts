import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/common/classes/DTOs/users/CreateUserDTO';

type User = CreateUserDTO & { id: number };

@Injectable()
export class UsersService {
  private users: User[] = [];

  async create(createUserDto: CreateUserDTO) {
    const user: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(user);
    console.log(this.users);
    return user;
  }

  async findAll() {
    return this.users;
  }

  async findOne(id: number) {
    return await this.users.find((user) => user.id === id);
  }

  //   update(id: number, updateUserDto: UpdateUserDto): User {
  //     const userIndex = this.users.findIndex((user) => user.id === id);
  //     this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
  //     return this.users[userIndex];
  //   }

  //   remove(id: number): void {
  //     this.users = this.users.filter((user) => user.id !== id);
  //   }
}
