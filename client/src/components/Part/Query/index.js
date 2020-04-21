import React, { useState } from "react";
import styled from "styled-components";
import { GetAll } from "../GetAll/";
import { GetByID } from "../GetByID";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #4d004d;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Field = styled.p`
  padding: 10px;
  font-weight: 900;
  font-size: 0.8em;
`;

export const Switch = styled.button`
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

export const NInput = styled.input`
  border: 2px solid green;
  border-radius: 4px;
  height: 20px;
  width: 50px;
  align-self: center;
`;

const RadioContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  color: #4d004d;
  font-size: 0.8em;
  font-weight: 900;
`;

const CheckContainer = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  color: #4d004d;
  font-size: 0.8em;
  font-weight: 900;
`;

const OptionContainer = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: row;
`;

const ResultToggle = styled.button`
  width: 200px;
  color: white;
  background-color: #4d004d;
`;

export const Query = (props) => {
  let [qcategory, setqCategory] = useState("Universities");
  let [addons, setAddons] = useState([]);
  let [fullResults, setFullResults] = useState(true);

  function addItem(addon) {
    if (addons.length === 0) {
      setAddonToArray(addon);
    } else {
      if (addons.includes(addon)) {
        let newAddons = addons.filter((e) => e !== addon);
        setAddons(newAddons);
      } else {
        setAddonToArray(addon);
      }
    }
  }

  function setAddonToArray(addon) {
    setAddons([...addons, addon]);
  }

  const queries = [
    {
      name: "Get all " + qcategory,
      qName: "getAll",
      qcategory,
      returnQuery: props.query,
      queryChoice: props.queryChoice,
      addons,
      fullResults,
    },
    {
      name: "Get Single " + qcategory,
      qName: "getByID",
      qcategory,
      returnQuery: props.query,
      queryChoice: props.queryChoice,
      addons,
      fullResults,
    },
  ];

  return (
    <Container>
      <RadioContainer>
        <label>Select which category to query</label>
        <select
          id="category"
          onChange={(e) => {
            setqCategory(e.target.value);
            setAddons([]);
          }}
        >
          <option value="Universities">University</option>
          <option value="Teaching">Teaching</option>
          <option value="Finances">Finances</option>
          <option value="Internationality">Internationality</option>
          <option value="Research">Research</option>
        </select>
      </RadioContainer>
      <GetAll query={queries[0]} />
      <GetByID query={queries[1]} />
      <CheckContainer>
        <h3>Select subcategories</h3>

        <OptionContainer>
          <input
            type="checkbox"
            value="university"
            disabled={qcategory === "Universities"}
            onChange={(e) => addItem(e.target.value)}
          />
          <label>University</label>

          <input
            type="checkbox"
            value="teaching"
            onChange={(e) => addItem(e.target.value)}
            disabled={qcategory !== "Universities"}
          />
          <label>Teaching</label>

          <input
            type="checkbox"
            value="finances"
            onChange={(e) => addItem(e.target.value)}
            disabled={qcategory !== "Universities"}
          />
          <label>Finances</label>

          <input
            type="checkbox"
            value="research"
            onChange={(e) => addItem(e.target.value)}
            disabled={qcategory !== "Universities"}
          />
          <label>Research</label>

          <input
            type="checkbox"
            value="internationality"
            onChange={(e) => addItem(e.target.value)}
            disabled={qcategory !== "Universities"}
          />
          <label>Internationality</label>
        </OptionContainer>
      </CheckContainer>
      <CheckContainer>
        <h3>Que for full results or scores only?</h3>
        <ResultToggle onClick={() => setFullResults(!fullResults)}>
          {fullResults
            ? `Querying for full results`
            : `Querying for only scores`}
        </ResultToggle>
      </CheckContainer>
    </Container>
  );
};
