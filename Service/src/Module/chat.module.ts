import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Chat, ChatSchema } from "src/Schemas/chat/chat.schema";
import { ChatController } from "src/Controller/chat.controller";
import { ChatService } from "src/Service/chat.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }])],
    controllers: [ChatController],
    providers: [ChatService]
})

export class ChatModule { }