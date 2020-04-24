import React, { useState } from "react";
import { FieldContainer, Field, Switch, NInput } from "../Query";
/**
 *
 * @param {Contains the query options selected in the parent query view} props
 */
export const GetByID = (props) => {
  const [id, setId] = useState();

  const {
    name,
    qName,
    queryChoice,
    returnQuery,
    qcategory,
    addons,
    fullResults,
  } = props.query;

  return (
    <FieldContainer>
      <Field>{name}</Field>
      <NInput placeholder="ID" onChange={(e) => setId(e.target.value)} />
      <Switch
        onClick={() =>
          returnQuery(queryChoice, qName, id, qcategory, addons, fullResults)
        }
      >
        Go
      </Switch>
    </FieldContainer>
  );
};
