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
            <div className="client-right-content">content</div>
            <div className="client-right-footer text-xs text-gray-500">内容由AI生成，可能不准确，请注意核实</div>
        </div>
    )
}

export default ClientRight;