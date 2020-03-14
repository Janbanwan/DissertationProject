import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const Title = styled.h2`
  color: #4d004d;
`;

export const GraphQl = props => {
  return (
    <Wrapper>
      <Title>{props.title}</Title>
    </Wrapper>
  );
};
