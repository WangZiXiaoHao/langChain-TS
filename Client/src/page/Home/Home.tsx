import './Home.css'
import './Home.less'
import ClientLeft from '@/area/ClientLeft'
import ClientRight from '@/area/ClientRight'

function Home() {

  return (
    <div className="agent-client flex flex-row h-screen">
      <ClientLeft />
      <ClientRight />
    </div>
  )
}

export default Home
