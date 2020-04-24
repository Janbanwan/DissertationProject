import React, { useState } from "react";
import styled from "styled-components";
import QueryView from "../QueryView";

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
/**
 * The back page of the application
 *
 * Allows the user to change between the query choice via the queryChoice state object.
 *
 */
export const HomeView = () => {
  const [queryChoice, setQueryChoice] = useState("REST");

  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Dissertation Client app</Header>
        <Para>
          This is an app used to test out two different implementations for
          retrieving data from the sama database
        </Para>
        <ButtonContainer>
          <ChoiceButton onClick={() => setQueryChoice("GraphQL")}>
            GraphQL
          </ChoiceButton>
          <ChoiceButton onClick={() => setQueryChoice("REST")}>
            REST
          </ChoiceButton>
        </ButtonContainer>
      </HeaderContainer>
      <BodyContainer>
        <QueryView
          queryChoice={queryChoice}
          title={`Queries are being executed with ${queryChoice}`}
        />
      </BodyContainer>
    </Wrapper>
  );
};
