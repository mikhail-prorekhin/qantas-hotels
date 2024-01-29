import React, { TransitionStartFunction, createContext } from "react";

export const AsyncContext = createContext<{
  isPending:boolean, 
  startTransition:TransitionStartFunction
}>({
  isPending: false,
  startTransition: undefined as unknown as TransitionStartFunction
});

interface Props {
  children: React.ReactNode;
}

export const AsyncProvider: React.FC<Props> = ({ children }) => {
  const [isPending, startTransition] = React.useTransition();

  return (
    <AsyncContext.Provider value={{ isPending, startTransition }}>
      {children}
    </AsyncContext.Provider>
  )
}