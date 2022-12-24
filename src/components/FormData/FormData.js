import React, { useEffect, useState } from "react";
import "./FormData.css";
import { getDataApi } from "../api/UserApi";
import { useNavigate } from "react-router-dom";

function FormData() {
  const navigate = useNavigate();
  const [allUsers, setAllUsers] = useState([]);

  const getData = async () => {
    const { data } = await getDataApi();
    setAllUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="formdata">
      <div className="navbar">
        <button
          onClick={() => {
            navigate("/form");
          }}
        >
          Add Another User
        </button>
        <span>All Users</span>
      </div>
      <div className="users">
        {allUsers.length <= 0
          ? "No Users Added!!"
          : allUsers.map((user) => {
              return (
                <div key={user._id}>
                  <p>First Name: {user.firstName}</p>
                  <p>Last Name: {user.lastName}</p>
                  <p>Phone Number: {user.phoneNumber}</p>
                  <p>Email: {user.email}</p>
                  <p>Gender: {user.gender}</p>
                  <p>
                    Date of Birth:{" "}
                    {user.dateOfBirth
                      ? user.dateOfBirth
                      : "DOB not added by user"}
                  </p>
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default FormData;
