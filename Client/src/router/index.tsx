import { createBrowserRouter } from 'react-router-dom';
import Home from '@/page/Home/Home';
import ChatDetail from "@/page/ChatDetail/ChatDetail"; // 用于 /chat/:id

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/chat/:sessionID', element: <ChatDetail /> }, // 动态路由匹配对话ID
]);

export default router;