import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from 'src/configs/DatabaseConfig';
import { UsersController } from 'src/controllers/UsersController';
import { UsersService } from 'src/services/UsersService';
import { AppController } from '../controllers/AppController';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot(DatabaseConfig.get())],
  controllers: [AppController, UsersController],
  providers: [UsersService],
})
export class AppModule {}
