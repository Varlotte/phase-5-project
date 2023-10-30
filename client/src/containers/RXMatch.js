//displays rx match
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MedicationsCard from "../components/MedicationsCard";

function RXMatch() {
  let { id } = useParams();
  console.log(id);
  const conditionAPI = `http://127.0.0.1:5555/conditions/${id}`;
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(conditionAPI, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((data) => {
        setTreatmentsData(data.treatments);
      });
  }, [conditionAPI]);

  return (
    <div style={{ textAlign: "center" }}>
      Fave a medication to discuss it with your doctor
      <ul className="cards">
        {treatmentsData.map((treatment, i) => {
          const medication = treatment.medication;
          return index === i ? (
            <MedicationsCard
              key={medication.id}
              medication={medication}
              setIndex={setIndex}
            />
          ) : null;
        })}
      </ul>
    </div>
  );
}

//faving or canceling needs to change the index value, if index is array.length,show "no more meds to display" update index with setIndex
//import medications cards here
export default RXMatch;
