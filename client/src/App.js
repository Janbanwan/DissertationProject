import React from "react";
import styled from "styled-components";
import { Home } from "./components/home/home";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

function App() {
  return (
    <Container className="App">
      <Home />
    </Container>
  );
}

export default App;
