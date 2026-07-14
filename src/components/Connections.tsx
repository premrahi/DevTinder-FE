import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useAppDispatch();
  const connectedUsers = useAppSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  },[]);

  if (!connectedUsers) return;

  if (connectedUsers.length === 0) return <h1 className="text-center my-20 text-4xl">Oops!, No Connections found</h1>;

  return (
    <div className="text-center  my-16 ">
      <span className="m-4 p-4  rounded-2xl  text-5xl font-semibold text-cyan-700 mx-auto">Connections</span>

      {connectedUsers.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex mx-auto p-4 my-10 rounded-3xl w-1/2 bg-slate-950">
            <div className="m-2 p-2">
              <img src={photoUrl} alt="photo" className="rounded- w-50"></img>
            </div>

            <div className="my-auto m-2 p-2 text-left">
              <h2 className="text-3xl font-semibold">{firstName + " " + lastName}</h2>
              <h3>age : {age}</h3>
              <h3>Gender : {gender}</h3>
              <p className="text-sm">{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
