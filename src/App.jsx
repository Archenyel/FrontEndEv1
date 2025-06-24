import TipoRequisito from './components/TipoRequisito'
import Categoria from './components/Categoria'
import Requisito from './components/Requisitos'


function App() {

  return (
    <>
      <h2>Tipo de Requisito</h2>
      <TipoRequisito />
      <h2>Requisitos</h2>
      <Requisito/>
      <h2>Categoría</h2>
      <Categoria />
    </>
  )
}

export default App