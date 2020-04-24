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
/**
 * Displays the left side of the home page.
 * Users defined and execute queries on this page
 */
export default class QueryView extends React.Component {
  state = {
    result: [],
    queryChoice: "REST",
    perform: [],
  };

  render() {
    /**
     *
     * Function handles the communication between the data retrieval functions and the UI components
     *
     * @param {REST / GRAPHQL} queryMode
     * @param {Name of the operation} value
     * @param {ID of the object queried if specified (Optional)} id
     * @param {The category being queried} path
     * @param {An array containing the sub categories that are retrieved with the parent object} addons
     * @param {Boolean, toggles wheter full results or section scores are retrieved} fullResults
     */
    const getQuery = async (
      queryMode,
      value,
      id,
      path,
      addons,
      fullResults
    ) => {
      let start = performance.now();
      const result = await switchQuery(
        queryMode,
        value,
        id,
        path,
        addons,
        fullResults
      );
      this.setState({ result });
      let end = performance.now();

      console.log(
        "Executing query in " + queryMode + ". Process time: " + (end - start)
      );
      this.setState((state) => {
        state.perform.push(end - start);
      });
      console.log(this.state.perform);
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
