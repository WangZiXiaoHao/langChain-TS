import { createSlice } from '@reduxjs/toolkit'
import type { ChatMessage } from '@/type'
import { parseSSEMessages } from '@/lib/utils';

const messagesSlice = createSlice({
    name: 'message',
    initialState: {
        messages: []
    },
    reducers: {
        userSendMsg: ({ messages }: { messages: ChatMessage[] }, action: { type: string, payload: ChatMessage }) => {
            const { payload } = action;
            messages.push(payload)
        },
        LLMSendMsg: ({ messages }: { messages: ChatMessage[] }, action: { type: string, payload: string }) => {
            const { payload } = action;
            const paresResult = parseSSEMessages(payload);
            const res = paresResult.events.map((i: any) => i.data.content).join(" ").replace(/-/g, ' ');
            const { events } = paresResult;
            // console.log(paresResult, '#### LLMMsg')
            // 最后一条消息需要时assistant，即可追加
            if (messages[messages.length - 1].role === 'assistant') {
                // 追加
                messages[messages.length - 1].content += res;
                // @ts-ignore
                if (events[events.length - 1]?.data.end) {
                    messages[messages.length - 1].isStreaming = false;
                }
            } else {
                // 构造LLM回复消息
                const LLMMsg: ChatMessage = {
                    uniqueId: crypto.randomUUID().replace(/-/g, ""),
                    role: 'assistant',
                    type: 'text',
                    content: res,
                    isStreaming: true
                }
                messages.push(LLMMsg)
            }
        },
    }
})


export const { userSendMsg, LLMSendMsg } = messagesSlice.actions

export default messagesSlice.reducer
