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
            const res = parseSSEMessages(payload).events.map((i: any) => i.data.content).join(" ").replace(/-/g, ' ');

            // console.log(parseSSEMessages(payload), '#### LLMMsg')
            // 最后一条消息需要时assistant，即可追加
            if (messages[messages.length - 1].role === 'assistant') {
                // 追加
                messages[messages.length - 1].content += res;
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
