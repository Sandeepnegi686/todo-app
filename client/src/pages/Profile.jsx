/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import InputBox from "../components/InputBox";
// import DialogDemo from "../components/Dialog";
import { InputFile } from "../components/InputFile";

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

  function handleToggle() {
    console.log("update handle");
  }

  return (
    <div className="conatiner max-w-md my-0 mx-auto min-h-full w-[90%] mt-20">
      <div className="w-full min-h-full">
        <div className="sign-up-box p-4 min-h-24 rounded-md overflow-hidden shadow-xl bg-white border-t-8 border-[#57568E]">
          <div className="flex justify-around items-center pb-6 border-b-2">
            <div className="profile-img w-24 h-24 my-0 border-2 border-[#57568E] rounded-[50%] overflow-hidden">
              <img
                src={user?.profileImg}
                className="max-w-full h-full object-cover"
                alt="profile-picture"
              />
            </div>
            <div className="update-profile-picture">
              <InputFile />
            </div>
          </div>
          <form className="my-2" onSubmit={handleUpdate}>
            <h2 className="text-center text-2xl mb-4">
              {changePassword ? "Change Password" : "Update Profile"}
            </h2>
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
