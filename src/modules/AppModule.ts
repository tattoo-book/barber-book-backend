import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/common/configs/DatabaseConfig';
import { JwtConfig } from 'src/common/configs/JwtConfig';
import { AuthController } from 'src/controllers/AuthController';
import { TattooArtistController } from 'src/controllers/TattooArtistController';
import { UsersController } from 'src/controllers/UsersController';
import { TattooArtistEntity } from 'src/entities/TattooArtistEntity';
import { UsersEntity } from 'src/entities/UsersEntity';
import { TattooArtistRepository } from 'src/repositories/TattooArtistRepository';
import { UserRepository } from 'src/repositories/UserRepository';
import { AuthService } from 'src/services/AuthService';
import { TattooArtistService } from 'src/services/TattooArtistService';
import { UsersService } from 'src/services/UsersService';
import { AppController } from '../controllers/AppController';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register(JwtConfig.register()),
    TypeOrmModule.forRoot(DatabaseConfig.get()),
    TypeOrmModule.forFeature([UsersEntity, TattooArtistEntity]),
  ],
  controllers: [AppController, UsersController, AuthController, TattooArtistController],
  providers: [UsersService, UserRepository, AuthService, TattooArtistRepository, TattooArtistService],
})
export class AppModule {}
