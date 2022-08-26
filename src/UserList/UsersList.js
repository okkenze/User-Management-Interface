import React, { useState } from "react";
import "./UserList.css";
import { ApiKey, BaseUrl } from "../Config";
import DeleteDialog from "../UI/DeleteDialog";

const UsersList = ({ user, showModal }) => {
  const [showBox, setShowBox] = useState(null);

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
        console.log(json);
        setShowBox(null);
        showModal();
      }
    } else {
      setShowBox(null);
    }
  };

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
          <input type="checkbox" id="delMultiple" name="chk" value="" />
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
