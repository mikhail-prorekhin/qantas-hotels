import React from "react";
import Container from "./components/Container";
import { AppProvider } from "./contexts/AppContext";
import { AsyncProvider } from "./contexts/AsyncContext";

const App = () => {
  return (
    <AppProvider>
      <AsyncProvider>
        <Container />
      </AsyncProvider>
    </AppProvider>

  )
}

export default App;
