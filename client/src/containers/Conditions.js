//for the four conditions to go into rxmatch
import React, { useEffect, useState, createContext } from "react";
import ConditionsCard from "../components/ConditionsCards";

const conditionsAPI = "http://127.0.0.1:5555/conditions";

function Conditions() {
  const [conditionsData, setConditionsData] = useState([]);

  useEffect(() => {
    fetch(conditionsAPI, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((data) => {
        setConditionsData(data);
      });
  }, []);

  const renderConditions = conditionsData.map((condition) => {
    return <ConditionsCard key={condition.id} condition={condition} />;
  });

  return (
    <div style={{ textAlign: "center" }}>
      Click on a condition to see which meds are commonly prescribed for it
      <ul className="cards">{renderConditions}</ul>
    </div>
  );
}

//import conditions cards here
export default Conditions;
