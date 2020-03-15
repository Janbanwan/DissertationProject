import React, { useState } from "react";
import { FieldContainer, Field, Switch, NInput } from "../Query";

export const GetByID = props => {
  const [id, setId] = useState();

  const { name, qName, queryChoice, returnQuery } = props.query;

  return (
    <FieldContainer>
      <Field>{name}</Field>
      <NInput placeholder="ID" onChange={e => setId(e.target.value)} />
      <Switch onClick={() => returnQuery(queryChoice, qName, id)}>Go</Switch>
    </FieldContainer>
  );
};
