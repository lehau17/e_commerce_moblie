import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MessageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const message = context.getClass().prototype['message'] || 'Success'; // Lấy message từ class hoặc set mặc định là "Success"
        return {
          message,
          ...data,
        };
      }),
    );
  }
}
