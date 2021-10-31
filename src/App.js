import { ModalProvider } from './providers';
import { StoreProvider } from './selectorProvider';
import Componente1 from './componente1';
import Componente2 from './componente2';
import Componente3 from './componente3';
import Componente4 from './componente4';
import Componente5 from './componente5';

function App() {
  return (
    <>
      <ModalProvider>
        <Componente1 />
        <Componente2 />
        <Componente3 />
      </ModalProvider>
      <StoreProvider>
        <Componente4 />
        <Componente5 />
      </StoreProvider>
    </>
  );
}

export default App;
