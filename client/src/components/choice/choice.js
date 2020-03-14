import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
`;

const ChoiceContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
  border: 1px solid;
  border-color: #ff99ff;
  width: 200px;
  text-align: center;
  background-color: #4d004d;
  color: white;
`;

export const Choice = props => {
  return (
    <Container>
      <ChoiceContainer onClick={() => props.getName("GraphQL")}>
        <p>GraphQL</p>
      </ChoiceContainer>
      <ChoiceContainer onClick={() => props.getName("REST")}>
        <p>REST</p>
      </ChoiceContainer>
    </Container>
  );
};
