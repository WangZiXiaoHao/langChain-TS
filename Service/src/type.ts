/**
 * Post请求的接口定义
 */
export interface PostRequestType {

}
/**
 * chat请求的接口定义
 */
/**
 * 消息角色
 */
export type Role = 'user' | 'assistant' | 'system';
/**
 * 消息类型
 */
export type Type = 'text'
export interface ChatRequestType {
    uniqueId?: string;
    role: Role;
    type?: Type;
    content: string;
    isStreaming?: boolean;
};