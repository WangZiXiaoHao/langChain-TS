import { Module } from '@nestjs/common';
import { AppController } from '../Controller/app.controller';
import { OllamaController } from '../Controller/ollama.controller';
import { AppService } from '../Service/app.service';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { RequestInterceptor } from '../Interceptor/requestInterceptor';
import { ErrorsInterceptor } from '../Interceptor/errors.interceptor';
import { TransformInterceptor } from '../Interceptor/transform.interceptor';
import { OllamaService } from 'src/Service/ollama.service';

@Module({
  imports: [],
  controllers: [AppController, OllamaController],
  providers: [
    AppService,
    OllamaService,
    { provide: APP_INTERCEPTOR, useClass: RequestInterceptor },
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor }
  ],
})
export class AppModule { }
