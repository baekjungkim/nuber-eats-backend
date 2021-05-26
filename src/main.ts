import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // 미들웨어 적용방법 1 (app.module.ts 에 적용방법 2)
  // 어플리케이션 전체에 적용
  // Function middleware 만 사용 가능
  // repository, class, dependency injection 사용 불가
  // app.use(JwtMiddleware);
  await app.listen(3000);
}
bootstrap();
