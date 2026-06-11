import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
    StatusCode: number;
    success: boolean;
    message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        // console.log('Before... TransformInterceptor');
        return next.handle().pipe(map(data => (
            {
                data,
                StatusCode: HttpStatus.OK,
                success: true,
                message: HttpStatus['200'],
            }
        )));
    }
}