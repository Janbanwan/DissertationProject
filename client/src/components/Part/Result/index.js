import React from "react";
import styled from "styled-components";
const Container = styled.div`
  height: 600px;
  width: 600px;
  overflow: hidden;
`;

const ScrollContainer = styled.div`
  height: 600px;
  width: 100%;
  overflow: auto;
  padding-right: 20px;
`;

const UniContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding-left: 20px;
  border-bottom: 3px solid green;
`;

const Title = styled.h4``;

const InnerData = styled.p`
  padding: 5px;
  font-size: 1em;
`;

const ScoreData = styled.p`
  padding: 2px;
  font-size: 1em;
`;

const ResultContainer = styled.div`
  display: flex;
`;

export const Result = props => {
  console.log("props");
  console.log(props);
  console.log("props");
  return (
    <Container>
      <ScrollContainer>
        {props.universities &&
          props.universities.map(uni => {
            return (
              <UniContainer key={uni.university_id}>
                <Title key={uni.university_id}>
                  ID: {uni.university_id} {uni.university_name}
                </Title>
                <InnerData>Country: {uni.country}</InnerData>
                <InnerData>Founded: {uni.founding_date}</InnerData>
                <ResultContainer>
                  <ScoreData>Score 2018: {uni.score_2018}</ScoreData>
                  <ScoreData>Score 2019: {uni.score_2019}</ScoreData>
                  <ScoreData>Score 2020: {uni.score_2020}</ScoreData>
                </ResultContainer>
              </UniContainer>
            );
          })}
      </ScrollContainer>
    </Container>
  );
};
