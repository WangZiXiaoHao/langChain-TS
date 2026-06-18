import React, { useRef, useEffect, useCallback } from 'react';

// --- 1. 类型定义 (Type Definitions) ---

/**
 * 消息角色
 */
export type Role = 'user' | 'assistant' | 'system';

/**
 * 单条消息数据结构
 */
export interface ChatMessage {
    id: string; // 唯一ID，用于React key
    role: Role;
    content: string | React.ReactNode; // 支持纯文本或富文本节点
    isStreaming?: boolean; // 标记当前是否正在生成中（用于显示光标等）
}

/**
 * 自定义渲染函数的参数
 */
interface RenderMessageProps {
    message: ChatMessage;
    index: number;
}

/**
 * 组件 Props 接口
 */
interface ChatDisplayAreaProps {
    /** 消息列表数据源 */
    messages: ChatMessage[];

    /**
     * 自定义消息渲染器
     * @description 允许开发者完全控制每条消息的 UI 结构
     * @default 默认仅渲染文本
     */
    renderMessage?: (props: RenderMessageProps) => React.ReactNode;

    /**
     * 容器类名
     */
    className?: string;

    /**
     * 是否在加载新消息时自动滚动到底部
     * @default true
     */
    autoScroll?: boolean;

    /**
     * 空状态占位符
     */
    emptyState?: React.ReactNode;
}

// --- 2. 组件实现 ---

const ChatDisplayArea: React.FC<ChatDisplayAreaProps> = ({
    messages,
    renderMessage,
    className = '',
    autoScroll = true,
    emptyState,
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // 自动滚动逻辑
    const scrollToBottom = useCallback(() => {
        if (autoScroll && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [autoScroll]);

    // 监听消息变化或流式传输状态，触发滚动
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    // 默认渲染器：处理简单的字符串或节点
    const defaultRenderMessage = ({ message }: RenderMessageProps) => {
        return (
            <div
                style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    maxWidth: '80%',
                    wordBreak: 'break-word',
                    backgroundColor: message.role === 'user' ? '#e3f2fd' : '#f5f5f5',
                    alignSelf: message.role === 'user' ? 'flex-end' : 'flex-start',
                    color: '#333',
                }}
            >
                {/* 这里可以根据需要扩展 Markdown 解析器 */}
                {typeof message.content === 'string' ? (
                    <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{message.content}</p>
                ) : (
                    message.content
                )}

                {/* 模拟流式输出的光标 */}
                {message.isStreaming && (
                    <span
                        style={{
                            display: 'inline-block',
                            width: '2px',
                            height: '1em',
                            backgroundColor: '#000',
                            marginLeft: '4px',
                            animation: 'blink 1s step-end infinite',
                            verticalAlign: 'middle',
                        }}
                    />
                )}
            </div>
        );
    };

    const activeRenderer = renderMessage || defaultRenderMessage;

    return (
        <div
            ref={scrollContainerRef}
            className={`chat-display-area ${className}`}
            style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                // 简单的 CSS Reset
                boxSizing: 'border-box',
            }}
        >
            {messages.length === 0 ? (
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#999',
                    }}
                >
                    {emptyState || '暂无对话记录'}
                </div>
            ) : (
                <>
                    {messages.map((msg, index) => (
                        <div key={msg.id} style={{ display: 'flex', flexDirection: 'column' }}>
                            {activeRenderer({ message: msg, index })}
                        </div>
                    ))}
                    {/* 锚点元素，用于滚动定位 */}
                    <div ref={messagesEndRef} style={{ height: '1px' }} />
                </>
            )}

            {/* 注入简单的闪烁动画样式 */}
            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    );
};

export default ChatDisplayArea;
