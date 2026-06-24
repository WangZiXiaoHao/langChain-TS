import { Controller, Post, Body, Get, Param, Header } from "@nestjs/common";
import { ChatService } from "src/Service/chat.service";
import { Chat } from "src/Schemas/chat/chat.schema";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    // 写路由 接口逻辑

    @Post('/create')
    @Header('Content-Type', 'application/json')
    create(@Body() createChatDTO: Partial<Chat>): Promise<Chat> {
        console.log(createChatDTO, '##### chat')
        return this.chatService.create(createChatDTO)
    }
}