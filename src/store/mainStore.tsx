import { useAuth } from 'hooks/api/useAuth';
import { useBooks } from 'hooks/api/useBooks';
import { useCategories } from 'hooks/private/useCategories';
import React, { createContext, useContext } from 'react';

import type { MainStoreProps } from './IMainStore';

const GlobalContext = createContext({});

interface StoreProviderProps {
  children: JSX.Element | React.ReactElement | React.ReactNode;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children } = props;

  const auth = useAuth();
  const books = useBooks();
  const categories = useCategories();

  // define our store value that will be shared
  const store: MainStoreProps = {
    auth,
    books,
    category: categories,
  };

  return (
    <GlobalContext.Provider value={store}>{children}</GlobalContext.Provider>
  );
};

export const useMainStore = () => {
  const store = useContext(GlobalContext);
  const result = store as MainStoreProps;
  return result;
};
