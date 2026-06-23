
/**
 * 消息角色
 */
export type Role = 'user' | 'assistant' | 'system';

/**
 * 消息类型
 */
export type Type = 'text'

/**
 * 单条消息数据结构
 */
export interface ChatMessage {
    uniqueId: string;
    role: Role;
    type: Type;
    content: string | React.ReactNode; // 支持纯文本或富文本节点
    isStreaming?: boolean; // 标记当前是否正在生成中（用于显示光标等）
}