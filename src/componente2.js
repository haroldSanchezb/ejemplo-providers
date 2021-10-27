import { useModal } from './providers';
const modalName = 'componente2';

const Componente2 = () => {
  const modalData = useModal();
  console.log(modalName, modalData);

  return (
    <div>
      <h1>Componente 2 {modalData.id === modalName ? 'show' : 'hide'}</h1>
    </div>
  );
};

export default Componente2;
