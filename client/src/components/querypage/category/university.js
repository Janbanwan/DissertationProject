import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const CatTitle = styled.h4`
  align-self: center;
`;

const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #4d004d;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Field = styled.p`
  padding: 10px;
  font-weight: 900;
  font-size: 0.8em;
`;

const Switch = styled.button`
  background-color: green;
  color: white;
  font-size: 0.8em;

  border-radius: 30px;
  height: 20px;
  align-self: center;
  border: none;
  width: 40px;
  margin: 2px;
`;

const NInput = styled.input`
  border: 2px solid green;
  border-radius: 4px;
  height: 20px;
  width: 50px;
  align-self: center;
`;

export const University = props => {
  const [id, setId] = useState();

  const queries = [
    { name: "Get all universities", args: {} },
    { name: "Get Single University", args: { id } },
    { name: "Add University", args: { uni: {} } }
  ];

  return (
    <Container>
      <CatTitle>{props.title}</CatTitle>
      <FieldContainer>
        <Field>{queries[0].name}</Field>
        <Switch onClick={() => props.query(queries[0].name)}>Go</Switch>
        <Switch onClick={() => props.log()}>Log</Switch>
      </FieldContainer>
      <FieldContainer>
        <Field>{queries[1].name}</Field>
        <NInput placeholder="ID" onChange={e => setId(e.target.value)} />
        <Switch
          onClick={() => props.query(queries[1].name, queries[1].args.id)}
        >
          Go
        </Switch>
      </FieldContainer>
      <FieldContainer>
        <Field>{queries[2].name}</Field>
        <NInput placeholder="Name" onChange={e => setId(e.target.value)} />
        <NInput placeholder="Date" onChange={e => setId(e.target.value)} />
        <NInput placeholder="country" onChange={e => setId(e.target.value)} />
        <NInput placeholder="score 18" onChange={e => setId(e.target.value)} />
        <NInput placeholder="score 19" onChange={e => setId(e.target.value)} />
        <NInput placeholder="score 20" onChange={e => setId(e.target.value)} />

        <Switch
          onClick={() => props.query(queries[1].name, queries[1].args.id)}
        >
          Go
        </Switch>
      </FieldContainer>
    </Container>
  );
};

/**
 *   const [uniId, setUniId] = useState(false);
  const [uniName, setUniName] = useState(false);
  const [uniDate, setUniDate] = useState(false);
  const [uniCountry, setUniCountry] = useState(false);
  const [uni2018, setUni2018] = useState(false);
  const [uni2019, setUni2019] = useState(false);
  const [uni2020, setUni2020] = useState(false);

  function setState(name) {
    switch (name) {
      case "university_id":
        setUniId(!uniId);
        break;
      case "university_name":
        setUniName(!uniName);
        break;
      case "founding_date":
        setUniDate(!uniDate);
        break;
      case "country":
        setUniCountry(!uniCountry);
        break;
      case "score_2018":
        setUni2018(!uni2018);
        break;
      case "score_2019":
        setUni2019(!uni2019);
        break;
      case "score_2020":
        setUni2020(!uni2020);
        break;
      default:
        break;
    }
  }

  const fields = [
    { name: "university_id", state: uniId },
    { name: "university_name", state: uniName },
    { name: "founding_date", state: uniDate },
    { name: "country", state: uniCountry },
    { name: "score_2018", state: uni2018 },
    { name: "score_2019", state: uni2019 },
    { name: "score_2020", state: uni2020 }
  ];
 */
