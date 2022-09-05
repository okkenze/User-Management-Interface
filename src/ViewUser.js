import React, { useEffect, useState } from "react";
//import useFetch from "./useFetch";
import { useUsersContext } from "../src/hooks/useUsersContext";
import UsersList from "./UserList/UsersList";
import "./UserList/ViewUser.css";
import { ApiKey, BaseUrl } from "./Config";
import ErrorModal from "./UI/ErrorModal";

const ViewUser = () => {
  //const { data: users, isPending, error } = useFetch(BaseUrl + "/getAllUsers");
  const { users, dispatch } = useUsersContext();
  //const [users, setUsers] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const headers = {
      ApiKey: ApiKey,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const fetchUsers = async () => {
      const response = await fetch(BaseUrl + "/getAllUsers", {
        headers,
      });
      const json = await response.json();
      if (response.ok) {
        // console.log(json["data"]);
        dispatch({ type: "SET_USERS", payload: json["data"] });
        // setUsers(json["data"]);
        setisPending(false);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const showModal = () => {
    setError({
      title: "Delete",
      message: "User deleted successfully",
    });
  };
  const errorHandler = () => {
    setError(null);
  };
  const showChecked = (chk) => {
    console.log("Logged from ViewUser", chk);
  };

  return (
    <div className="userDisplay">
      <button onClick={showChecked}>Delete Selected</button>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <h2>Users List</h2>
      {/* {error && <div>{error}</div>}*/}
      {isPending && <div>Loading....</div>}
      {users &&
        users.map((user) => (
          <UsersList
            key={user.id}
            user={user}
            showModal={showModal}
            showChecked={showChecked}
          />
        ))}
    </div>
  );
};

export default ViewUser;
