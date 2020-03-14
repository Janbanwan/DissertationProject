import React, { useState } from "react";
import styled from "styled-components";
import REST from "../querypage/REST";
import { GraphQl } from "../querypage/graphQl";

const Wrapper = styled.div`
  font-family: Tahoma, Geneva, sans-serif;
`;
const HeaderContainer = styled.div`
  text-align: center;
  padding-bottom: 5px;
  margin-bottom: 5px;
  border-bottom: 3px solid #4d004d;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Header = styled.h1`
  color: #4d004d;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
`;

const ChoiceButton = styled.button`
  padding: 10px;
  border-radius: 15px;
  width: 100px;
  background-color: #4d004d;
  color: white;
`;

const Para = styled.p``;

function showComponent(component) {
  switch (component) {
    case "GraphQL":
      return <GraphQl title="GraphQL API" />;
    case "REST":
      return <REST title="REST API" />;
    default:
      return (
        <Para>
          You can choose to use either a REST or a GraphQL API. Both are running
          on Node.js
        </Para>
      );
  }
}

export const Home = () => {
  const [component, setComponent] = useState();

  function getChoice(component) {
    setComponent(component);
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Dissertation Client app</Header>
        <Para>
          This is an app used to test out two different implementations for
          retrieving data from the sama database
        </Para>
        <ButtonContainer>
          <ChoiceButton onClick={() => getChoice("GraphQL")}>
            GraphQL
          </ChoiceButton>
          <ChoiceButton onClick={() => getChoice("REST")}>REST</ChoiceButton>
        </ButtonContainer>
      </HeaderContainer>
      <BodyContainer>{showComponent(component)}</BodyContainer>
    </Wrapper>
  );
};
