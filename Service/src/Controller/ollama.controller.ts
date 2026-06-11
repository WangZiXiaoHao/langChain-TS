import { Controller, Post, Body, Sse, Header } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OllamaService } from '../Service/ollama.service';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('/chat')
  @Sse()
  @Header('Content-Type', 'text/application/json')
  chatWithOllama(@Body() prompt: { message: string }): Observable<Object> {
    const { message } = prompt;
    console.log('Received chat request:', prompt, message);
    return this.ollamaService.chatWithOllama(message).pipe(
      map((chunk) => ({
        data: JSON.stringify({ answer: chunk, end: false }),
      }))
    );
  }
}