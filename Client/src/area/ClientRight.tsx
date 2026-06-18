import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeftRight } from "lucide-react";
import AiChatInput from "@/components/ui/AiChatInput";


const ClientRight = () => {
    return (
        <div className="client-right">
            <div className="client-right-header flex flex-row justify-between items-center p-4">
                <div>
                    <Select defaultValue="apple">
                        <SelectTrigger className="w-full border-none focus-visible:ring-0">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent
                            position="popper"
                            side="bottom"
                            align="start"
                            className="w-72"
                        >
                            <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <ArrowLeftRight />
                </div>
            </div>
            <div className="client-right-content flex flex-col justify-center items-center h-120">
                <div className="client-right-content-top flex justify-center items-center w-full mb-6">
                    <img className="client-left-header-logo mr-4 w-6 h-6" src="https://img.alicdn.com/imgextra/i4/O1CN01uar8u91DHWktnF2fl_!!6000000000191-2-tps-110-110.png" alt="logo" />
                    <p className="text-2xl font-bold">你好，我是千问</p>
                </div>
                <div className="client-right-content-bottom">
                    <AiChatInput />
                </div>


            </div>
        </div>
    )
}

export default ClientRight;