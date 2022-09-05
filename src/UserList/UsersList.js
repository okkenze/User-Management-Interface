import React, { useState } from "react";
import "./UserList.css";
import { ApiKey, BaseUrl } from "../Config";
import DeleteDialog from "../UI/DeleteDialog";
import { useUsersContext } from "../hooks/useUsersContext";

const UsersList = ({ user, showModal, showChecked }) => {
  const { dispatch } = useUsersContext();
  const [showBox, setShowBox] = useState(null);
  const [checkedId, setCheckedId] = useState({ chk: [], response: [] }); //

  const handleDelete = () => {
    showConfirmDialog();
  };

  //Alert box
  const showConfirmDialog = () => {
    setShowBox({
      title: "Delete",
      message: "Are you sure you want to delete this user?",
    });
  };
  function refreshPage() {
    window.location.reload(false);
  }
  const deleteHandler = async (choose) => {
    if (choose) {
      const response = await fetch(BaseUrl + "/deleteUser/" + user.id, {
        method: "DELETE",
        headers: {
          ApiKey: ApiKey,
        },
      });
      const json = await response.json();

      if (response.ok) {
        //console.log(json);
        dispatch({ type: "DELETE_USER", payload: json });
        setShowBox(null);
        showModal();
        setTimeout(() => refreshPage(), 3000);
      }
    } else {
      setShowBox(null);
    }
  };

  const handleChecked = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    const { chk } = checkedId;

    // console.log(`${value} is ${checked}`);
    // Case 1 : The user checks the box
    if (checked) {
      setCheckedId({
        chk: [...chk, value],
        response: [...chk, value],
      });
    }

    // Case 2  : The user unchecks the box
    else {
      setCheckedId({
        chk: chk.filter((e) => e !== value),
        response: chk.filter((e) => e !== value),
      });
    }
  };

  showChecked(checkedId.response);

  return (
    <div className="user-list">
      {showBox && (
        <DeleteDialog
          title={showBox.title}
          message={showBox.message}
          onDialog={deleteHandler}
        />
      )}
      <div className="user-preview" key={user.id}>
        <h2 className="name">
          <span style={{ color: "black" }}>Name: </span>
          {user.firstName} {user.lastName}
        </h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Gender: {user.gender}</p>
        <p className="role">Role: {user.role}</p>
        <div id="delChk">
          <input
            type="checkbox"
            id="delMultiple"
            name="chk"
            value={user.id}
            onChange={handleChecked}
          />
        </div>
        <div
          id="del"
          className="material-symbols-outlined"
          onClick={handleDelete}
        >
          Delete
        </div>
        <div id="edit" className="material-symbols-outlined">
          Edit
        </div>
      </div>
      {/* ))} */}
    </div>
  );
};

export default UsersList;
