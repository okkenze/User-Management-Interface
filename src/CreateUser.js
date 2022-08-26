import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { ApiKey, BaseUrl } from "./Config";
import axios from "axios";
import "./CreateUsercss/CreateUser.css";
//import Button from "./UI/Button/Button";
import classes from "./Logincss/Login.module.css";
import ErrorModal from "./UI/ErrorModal";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("");
  const [role, setRole] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let roleId = 0;
    roleId = parseInt(role);
    if (gender === "Select Gender") {
      setError({
        title: "Bad Request",
        message: "Gender should be Male oe Female",
      });
    }
    const user = {
      firstName,
      lastName,
      email,
      phone,
      gender,
      dateOfBirth,
      nationality,
      roleId,
    };
    setIsPending(true);

    const headers = {
      ApiKey: ApiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    axios
      .post(BaseUrl + "/createUser", JSON.stringify(user), {
        headers,
      })
      .then((response) => {
        console.log(response);

        setIsPending(false);
        setError({
          title: "Create user",
          message: "User created successfully",
        });
        //navigate("/home");
      })

      .catch((error) => {
        console.log(error);
        setIsPending(false);
        setError({
          title: "Create user",
          message: "Error occurred creating user",
        });
      });
  };
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div className="create">
      <h1>Create User</h1>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input
          type="text"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label>Last Name:</label>
        <input
          type="text"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label>Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Phone:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="Select Gender">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label>Date Of Birth:</label>
        <input
          type="date"
          required
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <label>Nationality:</label>
        <input
          type="text"
          required
          value={nationality}
          onChange={(e) => setNationality(e.target.value)}
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Select Role">Select Role</option>
          <option value="1">Admin</option>
          <option value="2">Customer</option>
        </select>
        <div className={classes.actions}>
          {!isPending && (
            <button type="submit" className="button">
              Add User
            </button>
          )}
          {isPending && (
            <button type="submit" className="button">
              Adding User.....
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateUser;
