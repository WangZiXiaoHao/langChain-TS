import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * SSE 解析函数的返回结果类型
 * @template T - 期望解析出的数据类型
 */
interface ParseSSEResult<T> {
  events: T[];      // 当前批次解析出的事件数组
  buffer: string;   // 未处理完的残留数据，供下一次解析使用
}

/**
 * 解析包含多条 SSE 数据的原始字符串
 * @template T - 期望解析出的数据类型
 * @param {string} rawString - 包含多条 SSE 事件的原始字符串（以 \n\n 分隔）
 * @param {string} [buffer=''] - 上一次未处理完的残留数据（用于处理网络分包）
 * @returns {ParseSSEResult<T>} - 返回解析出的事件数组和新的残留缓存
 */
export function parseSSEMessages<T = unknown>(rawString: string, buffer: string = ''): ParseSSEResult<T> {
  // 1. 将残留的 buffer 和新接收到的 rawString 拼接
  const data = buffer + rawString;
  const events: T[] = [];

  // 2. 以双换行符 \n\n 分割出独立的 SSE 事件块
  const blocks = data.split('\n\n');

  // 3. 最后一个元素可能是未完整的数据，保留作为下一次解析的 buffer
  const completeBlocks = blocks.slice(0, -1);
  const newBuffer = blocks[blocks.length - 1];

  completeBlocks.forEach(block => {
    const lines = block.split('\n');
    const dataLine = lines.find(line => line.startsWith('data: '));
    
    if (dataLine) {
      const jsonStr = dataLine.substring(6); // 截取 'data: ' 之后的内容
      if (jsonStr) {
        try {
          // 将 JSON 字符串解析为泛型类型 T
          events.push(JSON.parse(jsonStr) as T);
        } catch (e) {
          console.warn('SSE JSON 解析失败:', jsonStr, e);
        }
      }
    }
  });

  return {
    events,
    buffer: newBuffer
  };
}