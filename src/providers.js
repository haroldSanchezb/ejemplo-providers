import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';

const initialData = {
  id: '',
  payload: {},
};

const ModalContext = createContext(initialData);
const ModalDispatchContext = createContext(null);

const ModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState(initialData);

  const openModal = useCallback((id, payload) => {
    setModalData({ id, payload });
  }, []);

  const contextValue = useMemo(() => ({ modalData, openModal }), [modalData, openModal])

  return (
    <ModalDispatchContext.Provider value={contextValue.openModal}>
    <ModalContext.Provider value={contextValue.modalData}>
      {children}
    </ModalContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

const useModal = () => useContext(ModalContext);

const useDispatchModal = () => useContext(ModalDispatchContext);

export { ModalProvider, useModal, useDispatchModal };
