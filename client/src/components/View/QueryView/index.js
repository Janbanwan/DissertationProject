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
    universities: [],
    queryChoice: "REST"
  };

  render() {
    console.log(this.props);

    const logedi = () => {
      console.log(this.state);
    };

    const getQuery = async (value, id) => {
      console.log(value, id);
      const universities = await switchQuery(value, id);
      this.setState({ universities });
    };

    return (
      <Container>
        <Title>{this.props.title}</Title>
        <InnerContainer>
          <ContainerLeft>
            <Query
              query={getQuery}
              log={logedi}
              queryChoice={this.props.queryChoice}
            />
          </ContainerLeft>
          <ContainerRight>
            <Result universities={this.state.universities} />
          </ContainerRight>
        </InnerContainer>
      </Container>
    );
  }
}
