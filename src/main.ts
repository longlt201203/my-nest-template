import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Env } from '@utils/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Env.LISTEN_PORT);
}
bootstrap();
