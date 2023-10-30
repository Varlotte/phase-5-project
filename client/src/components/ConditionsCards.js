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
    <li className="card" style={{ display: "flex", textAlign: "left" }}>
      <h4 style={{ padding: "3%" }}>{name}</h4>
      <p style={{ padding: "3%" }}>{description}</p>
      <button className="selectCondition" onClick={handleClick}>
        Select Condition
      </button>
    </li>
  );
}
