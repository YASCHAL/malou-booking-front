import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEarthEurope, faEnvelope, faFileImage, faLock, faMapLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { axiosInstance } from "../../config";


const Register = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axiosInstance.post(
        "https://api.cloudinary.com/v1_1/dffsq6pem/image/upload",
        data
      );

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };
      await axiosInstance.post("/auth/register", newUser);
      dispatch({ type: "LOGIN_START" });
      try {
        const res = await axiosInstance.post("/auth/login", info);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="login">
        <div className="login_container">
          <div className="register">
            <h1>Register</h1>
            <div className="rI">
              <FontAwesomeIcon icon={faUser} className="rI_icon" />
              <input
                type="text"
                onChange={handleChange}
                id="username"
                placeholder="User Name"
              />
            </div>
            <div className="rI">
              <FontAwesomeIcon icon={faEnvelope} className="rI_icon" />
              <input
                type="text"
                onChange={handleChange}
                id="email"
                placeholder="E-mail"
              />
            </div>
            <div className="rI">
              <FontAwesomeIcon icon={faLock} className="rI_icon" />
              <input
                id="password"
                onChange={handleChange}
                type="password"
                className="password"
                placeholder="Password"
              />
            </div>
            <div className="rI">
              <FontAwesomeIcon icon={faEarthEurope} className="rI_icon" />
              <input
                type="text"
                onChange={handleChange}
                id="country"
                placeholder="Country"
              />
            </div>
            <div className="rI">
              <FontAwesomeIcon icon={faMapLocationDot} className="rI_icon" />
              <input
                type="text"
                onChange={handleChange}
                id="city"
                placeholder="City"
              />
            </div>
            <div className="rI">
              <FontAwesomeIcon icon={faPhone} className="rI_icon" />
              <input
                type="text"
                onChange={handleChange}
                id="phone"
                placeholder="Phone Number"
              />
            </div>
            <div className="formInput">
              <label htmlFor="file">
                Photo : <FontAwesomeIcon icon={faFileImage} className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="file"
              />
            </div>

            <button onClick={handleClick}>Create account</button>
            <Link to={"/login"}>
              <p>Back to login</p>{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
