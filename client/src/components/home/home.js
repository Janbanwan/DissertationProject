import React, { useState } from "react";
import styled from "styled-components";
import { Choice } from "../choice/choice";
import REST from "../querypage/REST";
import { GraphQl } from "../querypage/graphQl";

const Wrapper = styled.div`
  font-family: Tahoma, Geneva, sans-serif;
  flex-grow: 1;
`;
const HeaderContainer = styled.div`
  text-align: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 4px solid #4d004d;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Header = styled.h1`
  color: #4d004d;
`;

const Para = styled.p``;

function showBody(show) {
  switch (show) {
    case "GraphQL":
      return <GraphQl title="GraphQL API" />;
    case "REST":
      return <REST title="REST API" />;
    default:
      return (
        <div>
          <p>lol</p>
        </div>
      );
  }
}

export const Home = () => {
  const [show, setShow] = useState("REST");

  function get(value) {
    setShow(value);
  }

  return (
    <Wrapper>
      <HeaderContainer>
        <Header>Dissertation Client app</Header>
        <Para>
          This is an app used to test out two different implementations for
          retrieving data from the sama database{" "}
        </Para>
        <Para>
          You can choose to use either a REST or a GraphQL API. Both are running
          on Node.js
        </Para>
        <Choice getName={value => get(value)} />
      </HeaderContainer>
      <BodyContainer>{showBody(show)}</BodyContainer>
    </Wrapper>
  );
};
