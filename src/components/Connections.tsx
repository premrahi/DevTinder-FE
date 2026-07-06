import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectedUsers = useSelector((store) => store.connections);

  const fetchConnections = async () => {
    try {
      const res: Response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  });

  if (!connectedUsers) return;

  if (connectedUsers.length === 0) return <h1>No Connections found</h1>;

  return (
    <div className="text-center  my-16 ">
      <span className="m-4 p-4  rounded-2xl  text-5xl font-semibold text-cyan-700 mx-auto">Connections</span>

      {connectedUsers.map((connection: any) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div className="flex mx-auto p-4 my-10 rounded-3xl w-1/2 bg-slate-950">
            <div className="m-2 p-2">
              <img src={photoUrl} alt="photo" className="rounded-4xl"></img>
            </div>

            <div className="my-auto m-2 p-2 text-left">
              <h2 className="text-lg font-bold">{firstName + " " + lastName}</h2>
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
