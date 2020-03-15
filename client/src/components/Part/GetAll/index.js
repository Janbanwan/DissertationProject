import React from "react";
import styled from "styled-components";
import { FieldContainer, Field, Switch } from "../Query";

export const GetAll = props => {
  console.log(props);
  return (
    <FieldContainer>
      <Field>{props.query.name}</Field>
      <Switch onClick={() => props.returnQuery(props.query.qName)}>Go</Switch>
      <Switch onClick={() => props.log()}>Log</Switch>
    </FieldContainer>
  );
};
