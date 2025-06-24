import TipoRequisito from './components/TipoRequisito'
import Categoria from './components/Categoria'
import Requisito from './components/Requisitos'
import CategoriaRequisitos from './components/CategoriaRequisitos'


function App() {

  return (
    <>
      <h2>Tipo de Requisito</h2>
      <TipoRequisito />
      <h2>Requisitos</h2>
      <Requisito/>
      <h2>Categoría de Requisitos</h2>
      <CategoriaRequisitos />
      <h2>Categoría</h2>
      <Categoria />
    </>
  )
}

export default App