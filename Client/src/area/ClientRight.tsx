import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    // SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import AiChatInput from "@/components/ui/AiChatInput";
import { useNavigate } from "react-router-dom";
import { Request } from "@/lib/request_fetch";
import type { ChatMessage } from "@/type";
import { userSendMsg, LLMSendMsg } from '@/store/messagesSlice';
import { useSelector, useDispatch } from "react-redux";

interface IProps {
    sessionID?: string; //用于判断是否进入对话状态
}


const ClientRight = (props: IProps) => {
    const Navigate = useNavigate();
    // 提取状态
    const messages = useSelector((state: any) => state.message.messages)
    const dispatch = useDispatch();

    const { sessionID } = props;
    const isChat = !!sessionID;
    // 发起请求 
    const chatWithLLM = async (msg: ChatMessage) => {
        // 发起请求 流式输出
        await Request(
            '/api/ollama/chat',
            {
                method: 'POST',
                body: msg,
                stream: true,
                onChunk(chunk, fullText) {
                    dispatch(LLMSendMsg(chunk))
                },
            },
        )
    }


    // 对话内容
    const onChange = (message: ChatMessage) => {
        // Navigate(`/chat/${message.uniqueId}`)
        dispatch(userSendMsg(message));
        chatWithLLM(message)
    }
    return (
        <div className="client-right flex flex-col items-center">

            <div className="client-right-header flex flex-row flex-1 justify-between items-center w-full p-4">
                <div>
                    <Select defaultValue="apple">
                        <SelectTrigger className="w-full border-none focus-visible:ring-0">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent
                            position="popper"
                            side="bottom"
                            align="start"
                            className="w-72"
                        >
                            <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <ArrowLeftRight />
                </div>
            </div>


            <div className={`client-right-content flex flex-23 flex-col ${isChat ? 'justify-end' : 'justify-center'} items-center w-3xl h-120`}>
                {
                    !isChat &&
                    <div className="client-right-content-top flex justify-center items-center w-full mb-6">
                        <img className="client-left-header-logo mr-4 w-6 h-6" src="https://img.alicdn.com/imgextra/i4/O1CN01uar8u91DHWktnF2fl_!!6000000000191-2-tps-110-110.png" alt="logo" />
                        <p className="text-2xl font-bold">你好，我是千问</p>
                    </div>
                }

                <div className="client-right-content-bottom">
                    <AiChatInput onChange={onChange} messages={messages} />
                </div>
                {
                    isChat &&
                    <div className="text-xs text-zinc-500">
                        内容由AI生成，可能不准确，请注意核实
                    </div>
                }

            </div>


        </div>
    )
}

export default ClientRight;