import React from "react";
import styled from "styled-components";
import { HomeView } from "./components/View/HomeView";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`;
/**
 * Root object for REST application
 * Used to define global styles
 */
function App() {
  return (
    <Container className="App">
      <HomeView />
    </Container>
  );
}

export default App;
