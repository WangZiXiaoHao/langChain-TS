import { Controller, Post, Body, Sse, Header } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OllamaService } from '../Service/ollama.service';
import type { ChatRequestType } from 'src/type';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) { }

  @Post('/chat')
  @Sse()
  @Header('Content-Type', 'application/json')
  chatWithOllama(@Body() message: ChatRequestType): Observable<Object> {
    // console.log('Received chat request:', message);
    const { role, content } = message;
    return this.ollamaService.chatWithOllama([{role, content}]).pipe(
      map((chunk) => ({
        data: { type: 'text', content: chunk, end: !chunk },
      }))
    );
  }
  
}