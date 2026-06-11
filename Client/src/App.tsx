import './App.css'
import './App.less'
import ClientLeft from '@/area/ClientLeft'
import ClientRight from '@/area/ClientRight'

function App() {

  return (
    <div className="agent-client flex flex-row h-screen">
      <ClientLeft />
      <ClientRight />
    </div>
  )
}

export default App
