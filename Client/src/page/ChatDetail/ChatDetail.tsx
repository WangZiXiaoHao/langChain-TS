import ClientLeft from "@/area/ClientLeft";
import ClientRight from "@/area/ClientRight";
import { useParams } from "react-router-dom"


const ChatDetail = () => {
    const { sessionID } = useParams();
    console.log('#####ChatDetail/id ====> ', sessionID)
    return (
        <div className="agent-client flex flex-row h-screen">
            <ClientLeft />
            <ClientRight sessionID={sessionID} />
        </div>
    )
}

export default ChatDetail;