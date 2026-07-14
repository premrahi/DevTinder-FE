import axios from "axios";
import { BASE_URL } from "../constants";
import {  useAppDispatch } from "../utils/hooks";
import { removeFeed } from "../utils/feedSlice";
import type { User } from "../utils/types";

const UserCard = ({ user } : {user :User}) => {
  
  const dispatch = useAppDispatch() ;
  
  const { _id, age, gender, firstName, lastName, about, photoUrl } =
    user;



  const handleRequest = async (status : string, userId : string) => {
    try {
         await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
        dispatch(removeFeed(userId)) ;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-gray-600 rounded-4xl w-96 shadow-sm mx-auto my-10 ">
      <figure className="my-6 w-[95%] mx-auto ">
        <img
          className="w-full h-auto mx-6 rounded-2xl hover:cursor-pointer"
          src={photoUrl} 
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-xl"> {firstName + " " + lastName} </h2>
        <h3>
          Gender : <span className="text-lg">{gender}</span>{" "}
        </h3>
        <h3>Age : {age}</h3>
        <p>{about}</p>

        <div className="card-actions justify-between my-2">
          <button
            className="btn btn-primary hover:cursor-pointer  hover:text-black  rounded-xl"
            onClick={() => handleRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn  rounded-xl hover:cursor-pointer hover:text-black bg-pink-400"
            onClick={() => handleRequest("interested", _id)}
          >
            send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
