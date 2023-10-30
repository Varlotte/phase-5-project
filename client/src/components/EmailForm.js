import React, { useState } from "react";

function EmailForm({ addEmail }) {
  const [email, setEmail] = useState("");

  const handleChange = (fieldName) => {
    return (e) => {
      const val = e.target.value;
      switch (fieldName) {
        case "email":
          setEmail(val);
          break;
        default:
          return;
      }
    };
  };
  console.log(email);
  return (
    <div>
      <h2>Update your email!</h2>
      <form
        onSubmit={() => {
          const newEmail = {
            email,
          };
          addEmail(newEmail);
        }}
      >
        <input
          type="text"
          email="email"
          placeholder="enter a valid email address"
          value={email}
          onChange={handleChange("email")}
        />
        <button type="Submit"> Update Email</button>
      </form>
    </div>
  );
}

export default EmailForm;
