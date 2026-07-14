import axios from "axios";
import { useAppSelector, useAppDispatch } from "../utils/hooks";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { removeUser } from "../utils/userSlice";
import { nullFeed } from "../utils/feedSlice";


const Navbar = () => {
  const user = useAppSelector((store) => store.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(nullFeed());
    navigate("/login", { replace: true });
  } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Logout failed:", err.response?.status, err.response?.data || err.message);
      } else {
        console.error("Logout failed:", err);
      }
    }
};

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          👩‍💻 DevTinder 
        </Link>
      </div>
      <div className="flex gap-2 mx-4">
        {user && (
          <div className="dropdown dropdown-end flex ">
            <p className="m-2">welcome, {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Tailwind CSS Navbar component" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/" className="justify-between">
                  Home
                </Link>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections">Connections</Link>
              </li>
              <li>
                <Link to="/requests">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
