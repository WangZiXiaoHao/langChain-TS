import React, { useState, useRef, useEffect } from 'react';
import { Plus, Wand2, BrainCircuit, Telescope, GraduationCap, Presentation, Video, MoreHorizontal, Mic, ArrowUp } from 'lucide-react';

// 模拟的功能列表数据
const FEATURES = [
  { icon: Wand2, label: '任务助理' },
  { icon: BrainCircuit, label: '思考' },
  { icon: Telescope, label: '研究' },
  { icon: GraduationCap, label: '千问高考' },
  { icon: Presentation, label: 'PPT创作' },
  { icon: Video, label: 'AI生视频' },
  { icon: MoreHorizontal, label: '更多' },
];

export default function AIChatInput() {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 自动调整高度的逻辑
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // 重置高度以正确计算 scrollHeight
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // 限制最大高度为 200px
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      console.log('发送消息:', value);
      // 在这里添加发送逻辑
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* 主容器 */}
      <div className="relative flex flex-col bg-white border border-gray-200 rounded-[24px] shadow-sm focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-300 transition-all duration-200 overflow-hidden">

        {/* 1. 输入区域 */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="向千问提问"
          rows={1}
          className="w-full px-5 pt-4 pb-2 text-base text-gray-800 placeholder-gray-400 bg-transparent border-none outline-none resize-none min-h-[56px]"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // Firefox/IE 隐藏滚动条
        />
        {/* Webkit 浏览器隐藏滚动条的样式注入 */}
        <style>{`
          textarea::-webkit-scrollbar { display: none; }
        `}</style>

        {/* 2. 底部工具栏 */}
        <div className="flex items-center justify-between px-3 pb-2">

          {/* 左侧：加号按钮 */}
          <button className="p-2 mr-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors shrink-0">
            <Plus size={20} />
          </button>

          {/* 中间：功能列表 (支持横向滚动) */}
          <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar mask-gradient">
            {FEATURES.map((feature, index) => (
              <button
                key={index}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full whitespace-nowrap transition-colors shrink-0"
              >
                <feature.icon size={16} className="text-gray-500" />
                <span>{feature.label}</span>
              </button>
            ))}
          </div>

          {/* 右侧：操作区 */}
          <div className="flex items-center gap-2 ml-2 shrink-0">
            {/* 语音按钮 */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
              <Mic size={20} />
            </button>

            {/* 发送按钮 */}
            <button
              disabled={!value.trim()}
              className={`p-2 rounded-full transition-all duration-200 ${
                value.trim()
                  ? 'bg-black text-white shadow-md hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ArrowUp size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}