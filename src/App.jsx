import { useState } from 'react';
import TipoRequisito from './components/TipoRequisito';
import Categoria from './components/Categoria';
import Requisito from './components/Requisitos';
import CategoriaRequisitos from './components/CategoriaRequisitos';

function App() {
  const [selectedComponent, setSelectedComponent] = useState('TipoRequisito');

  const renderComponent = () => {
    switch(selectedComponent) {
      case 'TipoRequisito':
        return <TipoRequisito />;
      case 'Categoria':
        return <Categoria />;
      case 'Requisito':
        return <Requisito />;
      case 'CategoriaRequisitos':
        return <CategoriaRequisitos />;
      default:
        return <TipoRequisito />;
    }
  };

  return (
    <>
      <div style={{ marginBottom: '20px' }}>
        <h1>Seleccione un módulo</h1>
        <select 
          value={selectedComponent}
          onChange={(e) => setSelectedComponent(e.target.value)}
          style={{ padding: '5px', width: '250px' }}
        >
          <option value="TipoRequisito">Tipo de Requisito</option>
          <option value="Requisito">Requisitos</option>
          <option value="CategoriaRequisitos">Categoría de Requisitos</option>
          <option value="Categoria">Categoría</option>
        </select>
      </div>
      
      <h2>
        {selectedComponent === 'TipoRequisito' && 'Tipo de Requisito'}
        {selectedComponent === 'Requisito' && 'Requisitos'}
        {selectedComponent === 'CategoriaRequisitos' && 'Categoría de Requisitos'}
        {selectedComponent === 'Categoria' && 'Categoría'}
      </h2>
      
      {renderComponent()}
    </>
  );
}

export default App;