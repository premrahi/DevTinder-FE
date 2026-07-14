import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(user.skills || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [showToast, setShowToast] = useState<boolean>(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, skills, photoUrl },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-50 my-10">
        <div className="flex flex-col items-center">
          <UserCard
            user={{ firstName, lastName, age, gender, about, skills, photoUrl }}
          />
          <h2 className="mt-4 text-lg font-semibold">PREVIEW</h2>
        </div>

        <div className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <legend className="fieldset-legend text-lg">EDIT PROFILE</legend>

          <label className="label">First Name :</label>
          <input
            type="text"
            className="input"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Last Name :</label>
          <input
            type="text"
            className="input"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">gender :</label>
          <input
            type="text"
            className="input"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">Age :</label>
          <input
            type="text"
            className="input"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">about :</label>
          <textarea
            className="textarea"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />

          <label className="label">Skills :</label>
          <textarea
            className="textarea"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label className="label">photoUrl :</label>
          <input
            type="text"
            className="input"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button
            className="btn my-5 rounded-xl hover:cursor-pointer hover:text-black bg-blue-400"
            onClick={saveProfile}
          >
            SAVE CHANGES
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-center">
          <div className="alert text-xl font-bold text-white alert-success mb-20">
            <span>Profile saved successfully!.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
