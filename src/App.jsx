import { useState } from 'react'
import TipoRequisito from './components/TipoRequisito'
import Categoria from './components/Categoria'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
      <h2>Tipo de Requisito</h2>
      <TipoRequisito />
      <h2>Categoría</h2>
      <Categoria />
    </>
  )
}

export default App
