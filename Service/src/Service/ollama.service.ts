import { Injectable } from '@nestjs/common';
import { Ollama } from '@langchain/ollama';
import { Observable } from 'rxjs';

@Injectable()
export class OllamaService {
    private ollama: Ollama;

    constructor() {
        this.ollama = new Ollama({
            model: 'qwen2.5:0.5b',
        });
    }
    // 在这里可以实现与Ollama的对话逻辑
    // 例如，可以使用HTTP请求将消息发送到Ollama的API，并返回响应
    chatWithOllama(message: string): Observable<string> {
        console.log('OllamaService received message:', message);
        return new Observable((subscriber) => {
            console.log('Starting chat with Ollama, message:', message);
            const runStream = async () => {
                try {
                    console.log('Sending message to Ollama:', message);
                    const stream = await this.ollama.stream(message);
                    console.log('Received stream from Ollama', stream);
                    for await (const chunk of stream) {
                        subscriber.next(chunk); // 逐块发送生成的文本
                    }
                    subscriber.complete(); // 生成完毕，关闭连接
                }
                catch (error) {
                    subscriber.error(error);
                }
            }
            runStream();
        });
    }
}