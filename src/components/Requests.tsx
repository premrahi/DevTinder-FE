import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };


  const reviewRequest = async(status:string , _id:string) => {
    try{
         await axios.post(BASE_URL + "/request/review/" + status + "/" + _id , {} , {withCredentials :true})

        dispatch(removeRequest(_id)) ;
    }
    catch(err){
        console.error(err) ;
    }
  }


  useEffect(() => {
    fetchRequest();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-center my-20 text-4xl">Oops!, No request found</h1>
    );

  return (
    <div className="text-center  my-16 ">
      <span className="m-4 p-4  rounded-2xl  text-5xl font-semibold text-cyan-700 mx-auto">
        Requests
      </span>

      {requests.map((request: any) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div className="flex mx-auto p-4 my-10 rounded-3xl w-1/2 bg-slate-950">
            <div className="m-2 p-2">
              <img
                src={photoUrl}
                alt="photo"
                className="rounded-4xl w-50"
              ></img>
            </div>

            <div className="flex flex-1 justify-between items-center m-2 p-2">
              <div className="text-left">
                <h2 className="text-3xl font-semibold">
                  {firstName + " " + lastName}
                </h2>
                <h3>age : {age}</h3>
                <h3>Gender : {gender}</h3>
                <p className="text-sm">{about}</p>
              </div>

              <div>
                <button className="m-4 p-2 bg-blue-400 rounded-xl hover:cursor-pointer hover:text-black" onClick={()=>reviewRequest("accepted" , request._id)}>
                  Accept
                </button>
                <button className="m-4 p-2 bg-pink-400 rounded-xl hover:cursor-pointer hover:text-black" onClick={()=>reviewRequest("rejected" , request._id)}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
