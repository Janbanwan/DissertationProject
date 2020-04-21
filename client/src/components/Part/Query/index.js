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

export const Query = (props) => {
  let [qcategory, setqCategory] = useState("Universities");
  let [addons, setAddons] = useState([]);

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
    },
    {
      name: "Get Single " + qcategory,
      qName: "getByID",
      qcategory,
      returnQuery: props.query,
      queryChoice: props.queryChoice,
      addons,
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
        {qcategory === "Universities" ? (
          <h3>Select subcategories</h3>
        ) : (
          <h3>Include university?</h3>
        )}

        {qcategory !== "Universities" ? (
          <OptionContainer>
            <label>Yes</label>
            <input
              type="checkbox"
              value="university"
              onChange={(e) => addItem(e.target.value)}
            />
          </OptionContainer>
        ) : (
          <OptionContainer>
            <input
              type="checkbox"
              value="teaching"
              onChange={(e) => addItem(e.target.value)}
            />
            <label>Teaching</label>

            <input
              type="checkbox"
              value="finances"
              onChange={(e) => addItem(e.target.value)}
            />
            <label>Finances</label>

            <input
              type="checkbox"
              value="research"
              onChange={(e) => addItem(e.target.value)}
            />
            <label>Research</label>

            <input
              type="checkbox"
              value="internationality"
              onChange={(e) => addItem(e.target.value)}
            />
            <label>Internationality</label>
          </OptionContainer>
        )}
      </CheckContainer>
      <button onClick={() => console.log(addons)}>Test state</button>
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
