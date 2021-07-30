import React from "react";
import styled, { keyframes } from "styled-components";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import firebase from "../firebase_utils";

function Login() {
  const { signUp } = useAuth();

  const { touched, errors, handleBlur, handleChange, handleSubmit, values } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validate: (values) => {
        let errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.password) {
          errors.password = "Required";
        } else if (values.password.length < 6)
          errors.password = "Minimum Length should be 6 characters";
        return errors;
      },
      onSubmit: async (values) => {
        try {
          const { user } = await signUp(values.email, values.password);
          if (user) {
            await firebase
              .firestore()
              .collection(user.uid)
              .doc("user")
              .set({ uid: user.uid });
            window.location.href = "/";
          }
        } catch (err) {
          console.error("Failed to login");
        }
      },
    });

  return (
    <>
      <Wrapper>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Enter email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <Input
            type="password"
            placeholder="Enter password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && touched.password && <div>{errors.password}</div>}
          <Button type="submit">Login</Button>
        </Form>
      </Wrapper>
    </>
  );
}

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

export default Login;
