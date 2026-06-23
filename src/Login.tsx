import axios from "axios";
import React, { useState } from "react";


const Login: React.FC = () => {
  const [emailId, setEmailId] = useState("premrahi234@gmail.com");
  const [password, setPassword] = useState("Prahi@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:3000/login', {
        emailId,
        password,
      } ,{withCredentials:true});
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center ">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg">Login</legend>

        <label className="label">Email : {emailId}</label>
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

        <button className="btn btn-neutral mt-4 hover:bg-purple-500 " onClick={handleLogin}>
          Login
        </button>

      </fieldset>
    </div>
  );
};

export default Login;
