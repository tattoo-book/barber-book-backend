import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/configs/DatabaseConfig';
import { UsersController } from 'src/controllers/UsersController';
import { UsersEntity } from 'src/entities/UsersEntity';
import { UserRepository } from 'src/repositories/UserRepository';
import { UsersService } from 'src/services/UsersService';
import { AppController } from '../controllers/AppController';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DatabaseConfig.get()), TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AppController, UsersController],
  providers: [UsersService, UserRepository],
})
export class AppModule {}
