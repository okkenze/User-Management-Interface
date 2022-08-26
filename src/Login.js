import React, { useState } from "react";
import LoginHeader from "./LoginHeader";
import Card from "./UI/Card";
import Button from "./UI/Button/Button";
import { useNavigate } from "react-router-dom";
import classes from "./Logincss/Login.module.css";
import { ApiKey, BaseUrl } from "./Config";
import axios from "axios";
import ErrorModal from "./UI/ErrorModal";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [allIsValid, setAllIsValid] = useState(false);
  const [role, setRole] = useState("");
  const [roleIsValid, setRoleIsValid] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes("@") &&
        enteredPassword.trim().length > 6 &&
        role !== "Select Role"
    );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);

    setFormIsValid(
      event.target.value.length > 6 &&
        enteredEmail.trim().includes("@") &&
        role !== "Select Role"
    );
  };
  const roleChangeHandler = (event) => {
    setRole(event.target.value);

    setAllIsValid(
      event.target.value.trim() !== "Select Role" &&
        enteredEmail.includes("@") &&
        enteredPassword.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateRoleHandler = () => {
    setRoleIsValid(role.trim() === "Admin" || role.trim() === "Customer");
  };

  const submitHandler = (event) => {
    event.preventDefault();

    axios({
      url: BaseUrl + "/getUserByEmailAndRole",
      method: "Get",
      headers: {
        ApiKey: ApiKey,
      },

      params: {
        email: enteredEmail,
        role: role,
      },
    })
      .then((response) => {
        if (!response.Ok) {
          console.log("This is res ", response);
        }
        let dt = response.data.data.find(
          (e) => e.email === enteredEmail && e.role === role
        );
        //setData(dt);
        if (dt !== "") {
          console.log(dt.email.toString());
          console.log(dt.role.toString());
          navigate("/home");
        }

        console.log(dt);
      })
      .catch((error) => {
        setError({
          title: "Login",
          message: error.response.data.response,
        });
        console.log(error);
      });
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      <LoginHeader />
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={`${classes.login}`}>
        <form onSubmit={submitHandler}>
          <div
            className={`${classes.control} ${
              emailIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              onBlur={validateEmailHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              passwordIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onBlur={validatePasswordHandler}
            />
          </div>
          <div
            className={`${classes.control} ${
              roleIsValid === false ? classes.invalid : ""
            }`}
          >
            <label htmlFor="Role">Role</label>
            <select
              className={`${classes.select}`}
              value={role}
              onChange={roleChangeHandler}
              onBlur={validateRoleHandler}
              disabled={!formIsValid}
            >
              <option value="Select Role">Select Role</option>
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <div className={classes.actions}>
            <Button
              type="submit"
              className={classes.btn}
              disabled={!allIsValid}
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default Login;
