import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';
import { SerializationResponse } from './serialization.response';

@Injectable()
export class SerializationInterceptor<T> implements NestInterceptor {
  constructor(private readonly dtoClass: new (...args: any[]) => T) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        let serialized: T | T[] | null = null;
        if (data) {
          serialized = Array.isArray(data)
            ? data.map((item) =>
                plainToInstance(this.dtoClass, item, {
                  excludeExtraneousValues: true,
                }),
              )
            : plainToInstance(this.dtoClass, data, {
                excludeExtraneousValues: true,
              });
        }
        const response: SerializationResponse<T> = {
          success: true,
          data: serialized,
        };
        return response;
      }),
    );
  }
}
