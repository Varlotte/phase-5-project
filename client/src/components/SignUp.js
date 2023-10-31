//signup form
import React, { useContext } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../utils";

export default function SignUp() {
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
        Make an account to see our awesome content!
      </h1>
      <Formik
        initialValues={{ name: "", email: "", password: "", birthday: "" }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, "Too short!").required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(12, "Must be 12 characters")
            .required("Required"),
          birthday: Yup.date().required("Required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 5));
            setSubmitting(false);
            fetch("http://127.0.0.1:5555/users", {
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
                  alert("Unable to create account.");
                }
              });
          }, 400);
        }}
      >
        <Form>
          <label htmlFor="name">Name</label>
          <Field
            name="name"
            type="name"
            style={{
              width: "200px",
              margin: "10px 15px",
            }}
          />
          <ErrorMessage name="email" />

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

          <label htmlFor="birthday">Birthday</label>
          <Field
            name="birthday"
            type="date"
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
              color: "red",
            }}
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}
