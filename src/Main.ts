import { NestFactory } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/LoggingInterceptor';
import { AppModule } from './modules/AppModule';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
