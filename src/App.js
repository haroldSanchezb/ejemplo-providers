import { ModalProvider } from './providers';
import Componente1 from './componente1';
import Componente2 from './componente2';
import Componente3 from './componente3';

function App() {
  return (
    <ModalProvider>
      <Componente1 />
      <Componente2 />
      <Componente3 />
    </ModalProvider>
  );
}

export default App;
