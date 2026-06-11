import { Controller, Get } from '@nestjs/common';
import { AppService } from '../Service/app.service';
import { OllamaService } from '../Service/ollama.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly ollamaService: OllamaService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
