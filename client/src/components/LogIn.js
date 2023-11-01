import React, { useState, useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import NavBar from "./NavBar";
import { CurrentUserContext } from "../utils";
//create a function for user context and import it here

export default function Login() {
  const history = useHistory();
  const { setCurrentUser } = useContext(CurrentUserContext);
  return (
    <div>
      <h1
        style={{
          margin: "10px 10px",
          textAlign: "center",
          padding: "10px",
        }}
      >
        Make sure to log in!
      </h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(12, "Must be 12 characters")
            .required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            fetch("http://127.0.0.1:5555/login", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              mode: "cors",
              body: JSON.stringify(values),
            })
              .then((res) => res.json())
              .then((data) => {
                // console.log(data);
                if (data.id) {
                  window.sessionStorage.setItem("currentUser", data.id);
                  setCurrentUser(data.id);
                  //this passes current user to context
                  //sets current logged in user id so any other component can use it
                  //user id for the rest of the app is going to be sessionStorage.getItem('currentUser')
                  history.push("/account");
                } else {
                  alert("Login is bad.");
                }
              });
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="email">Email Address</label>
          <Field
            name="email"
            type="email"
            style={{
              width: "200px",
              margin: "10px 15px",
            }}
          />
          <ErrorMessage name="email" />

          <label htmlFor="password">Password</label>
          <Field
            name="password"
            type="password"
            style={{
              width: "200px",
              margin: "10px 10px",
            }}
          />
          <ErrorMessage name="password" />

          <button
            type="submit"
            style={{
              width: "200px",
              margin: "10px 15px",
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
      <p>
        Don't have an account yet? Make one <Link to="/signup">here!</Link>
      </p>
    </div>
  );
}
