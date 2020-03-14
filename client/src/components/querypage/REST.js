import React from "react";
import styled from "styled-components";
import { University } from "./category/university";
import { switchQuery } from "../../data/REST/";
import { UniRes } from "./results/uniRes";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const Title = styled.h2`
  color: #4d004d;
  align-self: center;
`;

const Subtitle = styled.h4`
  color: #4d004d;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
`;

const BodyLeft = styled.div``;

const BodyRight = styled.div``;

const CategoryContainer = styled.div``;

const categories = ["University"];

/*
  "Teaching",
  "Finances",
  "Internationality",
  "Research"
*/

export default class REST extends React.Component {
  state = {
    unis: []
  };

  render() {
    const logedi = () => {
      console.log(this.state);
    };

    const getQuery = async (value, id) => {
      console.log(value, id);
      const unis = await switchQuery(value, id);
      this.setState({ unis });
    };

    return (
      <Container>
        <Title>{this.props.title}</Title>
        <Body>
          <BodyLeft>
            <Subtitle>Query</Subtitle>
            {categories.map(c => {
              return (
                <CategoryContainer key={c}>
                  <University query={getQuery} log={logedi} title={c} />
                </CategoryContainer>
              );
            })}
          </BodyLeft>
          <BodyRight>
            <Subtitle>Result</Subtitle>
            <UniRes unis={this.state.unis} />
          </BodyRight>
        </Body>
      </Container>
    );
  }
}

/*
      <BtnContainer>
        <Send>Send Query</Send>
      </BtnContainer>

      const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Send = styled.button``;
      */
