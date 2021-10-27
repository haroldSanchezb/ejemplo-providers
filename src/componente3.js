import { useModal } from './providers';
const modalName = 'componente3';

const Componente3 = () => {
  const modalData = useModal();
  console.log(modalName, modalData);

  return (
    <div>
      <h1>Componente 3 {modalData.id === modalName ? 'show' : 'hide'}</h1>
    </div>
  );
};

export default Componente3;
