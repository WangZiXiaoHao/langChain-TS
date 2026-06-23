/**
 * 请求配置项接口
 */
export interface RequestOptions extends Omit<RequestInit, 'body' | 'method'> {
  /** 请求方法，默认 GET */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** 请求体，支持对象、字符串或 FormData */
  body?: Record<string, any> | string | FormData;
  /** 是否开启流式接收 */
  stream?: boolean;
  /** 流式输出时的逐块回调函数 */
  onChunk?: (chunk: string, fullText: string) => void;
}

/**
 * 自定义请求错误类，携带状态码和响应体数据
 */
export class RequestError extends Error {
  public status: number;
  public statusText: string;
  public data: any;

  constructor(message: string, status: number, statusText: string, data?: any) {
    super(message);
    this.name = 'RequestError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }
}

/**
 * 通用 Fetch 请求封装
 * @template T - 期望的响应数据类型
 * @param url - 请求地址
 * @param options - 配置项
 * @returns Promise<T> - 非流式返回解析后的数据，流式返回完整文本(string)
 */
export async function Request<T = any>(url: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
    stream = false,
    onChunk,
    signal,
    ...restOptions
  } = options;

  // 1. 自动处理 Content-Type 和 Body 序列化
  const fetchOptions: RequestInit = { 
    method, 
    signal, 
    headers: { ...headers },
    ...restOptions 
  };

  if (body !== undefined) {
    // 如果是 FormData，浏览器会自动设置 multipart/form-data 及 boundary，不要手动设置
    if (!(body instanceof FormData)) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };
      fetchOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    } else {
      fetchOptions.body = body;
    }
  }

  // 2. 发起请求
  let response: Response;
  try {
    response = await fetch(url, fetchOptions);
  } catch (error) {
    // 网络错误、DNS 解析失败、或主动 Abort
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new RequestError('Request aborted by user', 0, 'Aborted');
    }
    throw new RequestError(`Network Error: ${(error as Error).message}`, 0, 'Network Error');
  }

  // 3. 完整的状态码判断
  if (!response.ok) {
    let errorBody: any = null;
    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorBody = await response.json();
      } else {
        errorBody = await response.text();
      }
    } catch (e) {
      // 解析失败则忽略
    }

    throw new RequestError(
      errorBody?.message || `Request failed with status ${response.status}`,
      response.status,
      response.statusText,
      errorBody
    );
  }

  // 4. 处理流式输出
  if (stream) {
    if (!response.body) {
      throw new RequestError('ReadableStream not supported or no body in response', 0, 'No Body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let fullText = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;

        // 触发单块回调
        if (typeof onChunk === 'function') {
          onChunk(chunk, fullText);
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        throw new RequestError('Stream reading aborted', 0, 'Aborted');
      }
      throw err;
    } finally {
      reader.releaseLock();
    }

    // 流式模式下，通常返回的是字符串，这里做一层类型断言
    return fullText as unknown as T;
  }

  // 5. 处理普通 JSON / Text 响应
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }
  return response.text() as unknown as T;
}