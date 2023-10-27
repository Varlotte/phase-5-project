//conditions cards to pull into conditions list
import React from "react";
import { useHistory } from "react-router-dom";

export default function ConditionsCard({ condition }) {
  const history = useHistory();
  const { name, description } = condition;

  function handleClick() {
    history.push(`/conditions/:${condition.id}`);
    console.log("hi");
  }
  return (
    <li className="card">
      <h4>{name}</h4>
      <p>{description}</p>
      <button className="selectCondition" onClick={handleClick}>
        Select Condition
      </button>
    </li>
  );
}
