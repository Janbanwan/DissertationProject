import React from "react";
import { FieldContainer, Field, Switch } from "../Query";
/**
 *
 * @param {Contains the query options selected in the parent query view} props
 */
export const GetAll = (props) => {
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
      <Switch
        onClick={() =>
          returnQuery(
            queryChoice,
            qName,
            undefined,
            qcategory,
            addons,
            fullResults
          )
        }
      >
        Go
      </Switch>
    </FieldContainer>
  );
};
