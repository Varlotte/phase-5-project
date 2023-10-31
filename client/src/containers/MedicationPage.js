import React, { useEffect, useState } from "react";
import MedicationsCard from "../components/MedicationsCard";
import { useParams } from "react-router-dom";

export default function MedicationPage() {
  let { id } = useParams();
  const medicationAPI = `http://127.0.0.1:5555/medications/${id}`;
  const [medication, setMedication] = useState(null);

  useEffect(() => {
    fetch(medicationAPI, { credentials: "include", mode: "cors" })
      .then((r) => r.json())
      .then((data) => {
        setMedication(data);
      });
  }, [medicationAPI]);

  if (id && !medication) {
    return null;
  }

  const {
    name_brand,
    name_generic,
    drug_class,
    prescribed_for,
    side_effects,
    pill_image,
  } = medication;

  return (
    <div style={{ textAlign: "center" }}>
      Fave a medication to discuss it with your doctor
      <p>
        {" "}
        Note: RXMatch is not a diagnostic tool. Please discuss all medications
        seen on RXGnosis with your provider. Not all medications have the same
        side effects for all people. For more medication information, please
        visit{" "}
        <a href="http://www.medlineplus.gov" target="_blank">
          www.medlineplus.gov
        </a>
      </p>
      <h4 style={{ padding: "3%" }}>Brand Name: {name_brand}</h4>
      <h4 style={{ padding: "3%" }}>Generic Name: {name_generic}</h4>
      <h5 style={{ padding: "3%" }}>Drug Class: {drug_class}</h5>
      <h5 style={{ padding: "3%" }}>Also Treats:{prescribed_for}</h5>
      <p style={{ padding: "3%" }}>Common Side Effects:{side_effects}</p>
      <img
        src={pill_image}
        alt={name_generic}
        style={{ maxHeight: "80px", maxWidth: "80px" }}
      />
    </div>
  );
}
