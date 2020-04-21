import React from "react";
import styled from "styled-components";
import { Query } from "../../Part/Query";
import { switchQuery } from "../../../data/";
import { Result } from "../../Part/Result";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Title = styled.h2`
  color: #4d004d;
  align-self: center;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`;

const ContainerLeft = styled.div``;

const ContainerRight = styled.div``;

export default class QueryView extends React.Component {
  state = {
    result: [],
    queryChoice: "REST",
  };

  render() {
    const getQuery = async (
      queryMode,
      value,
      id,
      path,
      addons,
      fullResults
    ) => {
      const result = await switchQuery(
        queryMode,
        value,
        id,
        path,
        addons,
        fullResults
      );
      this.setState({ result });
    };

    return (
      <Container>
        <Title>{this.props.title}</Title>
        <InnerContainer>
          <ContainerLeft>
            <Query query={getQuery} queryChoice={this.props.queryChoice} />
          </ContainerLeft>
          <ContainerRight>
            <Result result={this.state.result} />
          </ContainerRight>
        </InnerContainer>
      </Container>
    );
  }
}
