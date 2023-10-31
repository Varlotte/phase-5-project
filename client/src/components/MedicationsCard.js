//medications cards to pull into faves and rx match
import React, { useContext } from "react";
import { CurrentUserContext } from "../utils";

export default function MedicationsCard({ medication, setIndex }) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    name_brand,
    name_generic,
    drug_class,
    prescribed_for,
    side_effects,
    pill_image,
  } = medication;

  const handleFaveClick = () => {
    const newFave = { user_id: currentUser, medication_id: medication.id };
    console.log(newFave);
    fetch("http://127.0.0.1:5555/faves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      mode: "cors",
      body: JSON.stringify(newFave),
    })
      .then((res) => res.json())
      .then((data) => {
        setIndex((prevIndex) => prevIndex + 1);
        console.log("faved");
      });
  };
  //setIndex to index +1
  //index is array.length,show "no more meds to display"

  const handleIgnoreClick = () => {
    setIndex((prevIndex) => prevIndex + 1);
    console.log("ignored");
  };

  return (
    <li className="card" style={{ display: "flex", textAlign: "left" }}>
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
      <button className="faveheart" onClick={handleFaveClick}>
        Fave This Med
      </button>
      <button className="ignore" onClick={handleIgnoreClick}>
        Ignore This Med
      </button>
    </li>
  );
}
