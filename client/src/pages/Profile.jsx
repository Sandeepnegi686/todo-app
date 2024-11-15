/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import InputBox from "../components/InputBox";

export default function Profile() {
  const { user, updateProfilePicture, updateUser, updatePass } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [oldPassword, setOldPassword] = useState("0000");
  const [newPassword, setNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  function handleUpdate(e) {
    e.preventDefault();
    if (changePassword) {
      updatePass({ oldPassword, newPassword });
      setOldPassword("");
      setNewPassword("");
    } else {
      updateUser({ name, email });
      setName("");
      setEmail("");
    }
  }

  return (
    <div className="conatiner max-w-md my-0 mx-auto min-h-full w-[90%] mt-20">
      <div className="w-full min-h-full">
        <div className="sign-up-box p-4 min-h-24 rounded-md overflow-hidden shadow-xl bg-white border-t-8 border-[#57568E]">
          <form className="my-2" onSubmit={handleUpdate}>
            <h2 className="text-center text-2xl mb-4">Profile</h2>
            <div className="relative">
              <div className="profile-img w-32 h-32 my-0 mx-auto border-2 border-[#57568E] rounded-[50%] overflow-hidden">
                <img
                  src="/profile-picture.jpg"
                  className="max-w-full h-full object-cover"
                  alt="profile-picture"
                />
              </div>
              <EditIcon handlePictureChange={updateProfilePicture} />
            </div>
            {changePassword ? (
              <>
                <InputBox
                  type="password"
                  id="oldPassword"
                  label="Current Password"
                  name="Password"
                  value={oldPassword}
                  handleChange={setOldPassword}
                />
                <InputBox
                  type="password"
                  id="newPassword"
                  label="New Password"
                  name="Password"
                  value={newPassword}
                  handleChange={setNewPassword}
                />
              </>
            ) : (
              <>
                <InputBox
                  type="name"
                  label="Name"
                  name="Name"
                  value={name}
                  handleChange={setName}
                />
                <InputBox
                  type="email"
                  label="Email"
                  name="Email"
                  value={email}
                  handleChange={setEmail}
                />
              </>
            )}

            <p
              className="pl-2 text-md text-gray-600 text-right hover:underline cursor-pointer"
              onClick={() => setChangePassword((p) => !p)}
            >
              {changePassword ? "Change User Detail" : "Change Password"}
            </p>
            <button
              className="text-center text-lg text-white-800 border border-gray-200 my-4 rounded w-full py-2 hover:bg-[#A5B4FC] hover:text-white transition duration-300 ease-in-out"
              type="submit"
            >
              {changePassword ? "Update Password" : "Update User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const EditIcon = ({ handlePictureChange }) => (
  <div
    className="absolute left-[57%] top-[73%] cursor-pointer"
    onClick={handlePictureChange}
  >
    <svg
      className="feather feather-edit"
      fill="none"
      height="24"
      width="24"
      stroke="#A5B4FC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  </div>
);
