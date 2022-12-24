import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUserApi } from "../api/UserApi";
import Error from "./Error/Error";
import "./Form.css";

function Form() {
  const navigate = useNavigate();
  const [displayError, setDispalyError] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (displayError) {
      setTimeout(() => {
        setDispalyError(false);
      }, 5000);
    }
  }, [displayError]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkError = (Data) => {
    if (Data.firstName === "" || Data.firstName.length < 3) {
      return "First Name should be atleast 3 charcaters";
    } else if (Data.lastName === "" || Data.lastName.length < 3) {
      return "Last Name should be atleast 3 charcaters";
    } else if (Data.email === "") {
      return "Email Feild cannot be empty";
    } else if (!Data.email.includes("@")) {
      return "Email should Include @ symbol";
    } else if (Data.phoneNumber === "") {
      return "Phone Number Feild cannot be empty";
    } else if (Data.phoneNumber.length !== 10) {
      return "Phone Number should be 10 digits only";
    } else if (Data.gender === "" || Data.gender === "0") {
      return "Gender field cannot be empty";
    } else {
      return null;
    }
  };

  const addUser = async (userData) => {
    try {
      const { data } = await addUserApi(userData);
      setUser(data);
      navigate("/data");
    } catch (error) {
      setError("This email already exists");
      setDispalyError(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = checkError(formData);
    if (err !== null) {
      setError(err);
      setDispalyError(true);
    } else {
      addUser(formData);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
    });
  };

  return (
    <div className="form-div">
      <p>User Form</p>
      <form className="form">
        <input
          value={formData.firstName}
          name="firstName"
          onChange={handleChange}
          placeholder="First Name"
          type="text"
        />
        <input
          value={formData.lastName}
          name="lastName"
          onChange={handleChange}
          placeholder="Last Name"
          type="text"
        />
        <input
          value={formData.email}
          name="email"
          onChange={handleChange}
          placeholder="Email"
          type="Email"
        />
        <input
          value={formData.phoneNumber}
          name="phoneNumber"
          onChange={handleChange}
          placeholder="Phone Number"
          type="phone"
        />
        <input
          value={formData.dateOfBirth}
          name="dateOfBirth"
          onChange={handleChange}
          type="date"
        />
        <select value={formData.gender} name="gender" onChange={handleChange}>
          <option value="0"> Select Gender:</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </form>
      <div className="buttons">
        <button onClick={handleSubmit}>Submit Form</button>
        <button onClick={handleReset}>Reset Form</button>
      </div>

      {displayError && error !== null ? <Error error={error} /> : ""}
    </div>
  );
}

export default Form;
