import { Module } from '@nestjs/common';
import { AppController } from '../controllers/AppController';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
