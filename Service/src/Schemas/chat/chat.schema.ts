import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ChatDocument = Chat & Document;

@Schema()
export class Chat {
    @Prop({ required: true })
    "uniqueId": string;

    @Prop({ required: true })
    "title": string;

}

export const ChatSchema = SchemaFactory.createForClass(Chat);
