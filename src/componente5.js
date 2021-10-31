import { connect, useDispatchStore } from './selectorProvider';

const Componente5 = (props) => {
  const setData = useDispatchStore();
  console.log('Componente5', props);

  return (
    <div>
      <h1>Componente 5</h1>
      <p>{props.tal}</p>
      <button onClick={() => setData('data1', {hola: 'hola!'})}>Componente 4</button>
    </div>
  );
};

export default connect(state => state.data2, Componente5);
