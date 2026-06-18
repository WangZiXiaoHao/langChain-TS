
import { Button } from '@/components/ui/button'
import { Search, MessageSquare, MessageSquareDashed, Smile, Folder, SlidersHorizontal, Plus } from 'lucide-react'

const ClientLeft = () => {
    return (
        <div className="client-left flex flex-col items-center relative">
            <div className="client-left-header flex flex-col justify-around p-1 grow-2">
                <div className="client-left-header-top flex flex-row items-center justify-between">
                    <img className="client-left-header-logo h-4 ml-4" src="https://img.alicdn.com/imgextra/i2/O1CN01up8phV1nOEkRh0W5R_!!6000000005079-2-tps-101-54.png?inlinePreload" alt="logo" />
                    <Search className="client-left-header-search h-4" />
                </div>
                <div className="client-left-header-bottom flex flex-row items-center justify-between">
                    <Button variant="outline" className="new-chat grow-21 bg-white text-black">
                        <MessageSquare />
                        新建对话
                    </Button>
                    <Button variant="outline" className="temp-chat grow-3 bg-white text-black">
                        <MessageSquareDashed />
                    </Button>
                </div>

            </div>
            <div className='client-left-content-warpper grow-22 flex-9 flex-col w-full overflow-hidden'>
                <div className="client-left-content h-11/12 overflow-auto ml-4">
                    <div className='client-left-content-menu mb-4'>
                        <div className="flex flex-row items-center justify-start mt-2">
                            <Folder />
                            <span className="text-sm ml-1.5">我的空间</span>
                        </div>
                        <div className="flex flex-row items-center justify-start mt-2">
                            <SlidersHorizontal />
                            <span className="text-sm ml-1.5">智能体</span>
                        </div>
                    </div>
                    <div className='client-left-content-menu mb-4 flex flex-col items-start justify-start'>
                        <span className="text-xs text-gray-500">对话分组</span>
                        <div className="flex flex-row items-center justify-start">
                            <Plus />
                            <span className="text-sm ml-1.5">新分组</span>
                        </div>
                    </div>
                    <div className='client-left-content-menu mb-4 flex flex-col items-start justify-start'>
                        <span className="text-xs text-gray-500">最近对话</span>

                    </div>
                </div>
            </div>
            <div className="client-left-footer absolute bottom-0 left-0 flex justify-start items-center ml-4 h-10 ">
                <Smile />
                <span className="text-xs">Agent-Qwen Nick</span>
            </div>
        </div>
    )
}

export default ClientLeft