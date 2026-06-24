import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Chat, ChatDocument } from "src/Schemas/chat/chat.schema";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name)
        private readonly chatModel: Model<ChatDocument>
    ) { }

    // SQL逻辑
    /**
     * 添加对话
     * @param createChatDTO 
     * @returns Promise<Chat>
     */
    async create(createChatDTO: Partial<Chat>): Promise<Chat> {
        const newChat = new this.chatModel(createChatDTO);
        return newChat.save();
    }
}