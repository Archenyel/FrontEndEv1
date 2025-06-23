import { useState } from 'react'
import TipoRequisito from './components/TipoRequisito'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TipoRequisito />
      <TipoRequisito />
      <TipoRequisito />
    </>
  )
}

export default App
