import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import produce from 'immer';

const initialData = {
  data1: {
    hola: 'hola',
    adios: 'adios',
  },
  data2: {
    vamos: 'vamos',
    que: 'que',
    tal: 'tal',
  },
};

const StoreContext = createContext(initialData);
const StoreDispatchContext = createContext(null);

const StoreProvider = ({ children }) => {
  const [store, setStore] = useState(initialData);

  const setData = useCallback((id, data) => {
    setStore(prevStore => produce(prevStore, draft => {
      draft[id] = {...draft[id], ...data};
    }));
  }, []);

  const contextValue = useMemo(() => ({ store, setData }), [store, setData])

  return (
    <StoreDispatchContext.Provider value={contextValue.setData}>
    <StoreContext.Provider value={contextValue.store}>
      {children}
    </StoreContext.Provider>
    </StoreDispatchContext.Provider>
  );
};

const useStore = (fn) => fn(useContext(StoreContext));

const useDispatchStore = () => useContext(StoreDispatchContext);

const connect = (selector, Component) => props => {
  const store = useStore(selector);
  
  return useMemo(() => <Component {...props}{...store} />, [props, store]);
};

export { StoreProvider, useStore, useDispatchStore, connect };
