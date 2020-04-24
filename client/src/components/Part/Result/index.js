import React from "react";
import styled from "styled-components";
const Container = styled.div`
  width: 600px;
  overflow: wrap;
`;
/**
 * Component shows the result object and its lenght
 * @param {Contains the result object} props
 */
export const Result = (props) => {
  return (
    <Container>
      {props.result !== undefined && (
        <div>
          <div>Response length: {JSON.stringify(props.result).length}</div>
          <div>
            <pre>{JSON.stringify(props.result, undefined, 4)}</pre>
          </div>
        </div>
      )}
    </Container>
  );
};
