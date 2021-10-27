import { useDispatchModal } from './providers';

const Componente1 = () => {
  const openModal = useDispatchModal();
  
  console.log('Componente1');

  return (
    <>
    <h1>Componente 1</h1>
    <ul>
      <li><button onClick={() => {
        openModal('componente2');
      }}>componente2</button></li>
      <li><button onClick={() => {
        openModal('componente3', { data: 'data' });
      }}>componente3</button></li>
    </ul>
    </>
  );
};

export default Componente1;