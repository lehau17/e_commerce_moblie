import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AccessTokenGuard } from './common/guard/accessToken.guard';
import { HttpExceptionFilter } from './common/handler_error';
import { TransformInterceptor } from './common/handler_response';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new AccessTokenGuard(new Reflector()));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor(new Reflector()));
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Loại bỏ các thuộc tính không được định nghĩa trong DTO
      forbidNonWhitelisted: true, // Quay lại lỗi nếu có bất kỳ thuộc tính nào không hợp lệ
      transform: true, // Tự động chuyển đổi kiểu dữ liệu từ chuỗi sang kiểu dữ liệu được định nghĩa trong DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
