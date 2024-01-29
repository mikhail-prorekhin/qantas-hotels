import React, { createContext, useReducer } from "react";
import { AppStateType, appReducer, initialState } from "../state/reducer";

export const AppContext = createContext<{
  state: AppStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState(),
  dispatch: undefined as unknown as React.Dispatch<any>
});

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState());

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}