import { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { useAppContext } from "../context/appContext";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";

export default function Ragister() {
  const { loginUser, signUpUser, user } = useAppContext();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (user) {
        navigate("/");
      }
    },
    [user, navigate]
  );

  const [newUser, setNewUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUpLogin(e) {
    e.preventDefault();
    if (newUser) {
      if (!name || !email || !password) return;
      signUpUser({ name, email, password });
    } else {
      if (!email || !password) return;
      loginUser({ email, password });
    }
  }

  return (
    <div className="w-full min-h-full">
      <Navigation />
      <div className="conatiner max-w-md my-0 mx-auto min-h-full w-[90%] mt-20">
        <div className="w-full min-h-full">
          <div className="sign-up-box p-4 min-h-24 rounded-md overflow-hidden shadow-xl bg-white border-t-8 border-[#57568E]">
            <form className="my-2" onSubmit={handleSignUpLogin}>
              <h2 className="text-center text-2xl mb-4">
                {newUser ? "Register" : "Login"}
              </h2>
              {newUser && (
                <InputBox
                  type="name"
                  label="Name"
                  name="Name"
                  value={name}
                  handleChange={setName}
                />
              )}
              <InputBox
                type="email"
                label="Email"
                name="Email"
                value={email}
                handleChange={setEmail}
              />
              <InputBox
                type="password"
                label="Password"
                name="Password"
                value={password}
                handleChange={setPassword}
              />

              <button
                className="text-center text-lg text-gray-800 border border-gray-200 my-4 rounded w-full py-2 hover:bg-[#A5B4FC] hover:text-white transition duration-300 ease-in-out"
                type="submit"
              >
                {newUser ? "Sign up" : "Login"}
              </button>
              <p className="mt-4 text-center text-lg text-gray-800">
                {newUser ? "Not a member yet ? " : "Already a member ? "}
                <span
                  className="text-[#57568E] cursor-pointer"
                  onClick={() => setNewUser((p) => !p)}
                >
                  {newUser ? "Register" : "Login"}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
