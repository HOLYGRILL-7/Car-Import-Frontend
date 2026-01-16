import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Fixed import
import { useAuth } from "../../context/useAuth";
import user_icon from "../../assets/Icons/user.png";
import mail_icon from "../../assets/Icons/mail.png";
import pass_icon from "../../assets/Icons/pass.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate(); // ✅ Moved up

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Replace with actual registration API call
    // For now, just creating a new user and logging them in
    const newUser = {
      id: Date.now(), // Temporary ID
      name: name,
      email: email,
      role: "user", // New registrations are regular users
    };

    login(newUser);
    navigate("/users/dashboard");
  };

  const handleKeepBrowsing = () => {
    navigate("/");
  };

  return (
    <div className="bg-gray-300 h-screen  flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full m-auto space-y-8 bg-white rounded-lg p-8"
      >
        <div className="header text-center space-y-2">
          <div className="text-2xl font-bold">Sign Up</div>
          <h1>Create an account with us today!</h1>
        </div>
        <div className="inputs">
          <div className="input flex mt-5 bg-gray-200 h-15 opacity-80 rounded">
            <img
              src={user_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="text"
              value={name}
              placeholder="Name"
              required
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email flex mt-5 bg-gray-200 h-15 opacity-80 rounded">
            <img
              src={mail_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="email" // ✅ Fixed
              value={email}
              placeholder="Email"
              required
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password flex mt-5 bg-gray-200 h-15 opacity-80 rounded">
            <img
              src={pass_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80"
            />
            <input
              type="password" // ✅ Fixed
              value={password}
              placeholder="Password"
              required
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons space-y-3">
          <button
            type="submit"
            className="bg-blue-600 h-14 font-semibold text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 w-full"
          >
            Sign Up
          </button>
          <button
            type="button"
            className="w-full p-3 bg-gray-500 hover:bg-gray-600 h-14 font-semibold text-white rounded-lg border-none cursor-pointer"
            onClick={handleKeepBrowsing}
          >
            Keep Browsing
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
