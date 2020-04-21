import React from "react";
import { FieldContainer, Field, Switch } from "../Query";

export const GetAll = (props) => {
  const {
    name,
    qName,
    queryChoice,
    returnQuery,
    qcategory,
    addons,
  } = props.query;
  return (
    <FieldContainer>
      <Field>{name}</Field>
      <Switch
        onClick={() =>
          returnQuery(queryChoice, qName, undefined, qcategory, addons)
        }
      >
        Go
      </Switch>
    </FieldContainer>
  );
};
