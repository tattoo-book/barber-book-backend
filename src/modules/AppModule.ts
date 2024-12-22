import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/common/configs/DatabaseConfig';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { AuthController } from 'src/controllers/AuthController';
import { BarberController } from 'src/controllers/BarberController';
import { BarberShopsController } from 'src/controllers/BarberShopController';
import { BookingController } from 'src/controllers/BookingController';
import { UsersController } from 'src/controllers/UsersController';
import { BarberEntity } from 'src/entities/BarberEntity';
import { BarberShopsEntity } from 'src/entities/BarberShopsEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { BarberRepository } from 'src/repositories/BarberRepository';
import { BarberShopsRepository } from 'src/repositories/BarberShopRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthService } from 'src/services/AuthService';
import { BarberService } from 'src/services/BarberService';
import { BookingService } from 'src/services/BookingService';
import { BarberShopsService } from 'src/services/StudiosService';
import { UsersService } from 'src/services/UsersService';
import { AppController } from '../controllers/AppController';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.get()),
    TypeOrmModule.forFeature([UsersEntity, BarberEntity, BarberShopsEntity]),
  ],
  controllers: [AppController, UsersController, AuthController, BarberController, BarberShopsController, BookingController],
  providers: [UsersService, UserRepository, AuthService, BarberShopsService, BarberRepository, BarberShopsRepository, BarberService, BookingService],
})
export class AppModule {}
