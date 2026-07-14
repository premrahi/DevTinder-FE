import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Login: React.FC = () => {
  const [emailId, setEmailId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error , setError] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async() => {
    try{
      const res  = await axios.post(BASE_URL + "/signup" , {firstName,lastName,emailId,password} ,{withCredentials:true}) ;

      dispatch(addUser(res.data.data))
      // console.log(res.data.data) ;
      return navigate('/profile')
    }catch(err){
      console.error(err) ;
    }
  }

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
    } catch (err:any) {

      setError(err?.response?.data || "something went wrong!")
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center ">
      <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend text-lg">{ isLogin ? "Login" : "Sign UP"}</legend>

        { !isLogin &&         
          
          <>
          <label className="label">FirstName :</label>
        <input
          type="firstName"
          className="input"
          placeholder={firstName}
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="label">LastName :</label>
        <input
          type="lastName"
          className="input"
          placeholder={lastName}
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        
       
        </>
}
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
          className="btn btn-neutral bg-purple-900 mt-4 hover:bg-purple-500 "
          onClick={isLogin ? handleLogin : handleSignUp}
        >
          Login
        </button>
        <p className="text-slate-400 hover:text-yellow-400 hover:cursor-pointer text-center" onClick={() => setIsLogin((v) => !v)}>{isLogin ? "New User? Sign Up here!" : "Existing User? Login here!"}</p>

      </fieldset>
    </div>
  );
};

export default Login;
