import { connect, useDispatchStore } from './selectorProvider';

const Componente4 = (props) => {
  const setData = useDispatchStore();
  console.log('Componente4', props);

  return (
    <div>
      <h1>Componente 4</h1>
      <p>{props.hola}</p>
      <button onClick={() => setData('data2', {tal: 'tal!'})}>Componente 5</button>
    </div>
  );
};

export default connect(state => state.data1, Componente4);
