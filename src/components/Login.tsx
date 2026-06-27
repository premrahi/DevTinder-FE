import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login: React.FC = () => {
  const [emailId, setEmailId] = useState("premrahi234@gmail.com");
  const [password, setPassword] = useState("Prahi@123");
  const [error , setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true },
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {

      setError(err?.response?.data || "something went wrong!")
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center ">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg">Login</legend>

        <label className="label">Email :</label>
        <input
          type="email"
          className="input"
          placeholder={emailId}
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          placeholder={password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500">{error}</p>
        <button
          className="btn btn-neutral mt-4 hover:bg-purple-500 "
          onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
