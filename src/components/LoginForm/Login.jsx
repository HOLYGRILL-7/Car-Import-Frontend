import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth"; // Import useAuth
import user_icon from "../../assets/Icons/user.png";
import mail_icon from "../../assets/Icons/mail.png";
import pass_icon from "../../assets/Icons/pass.png";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext

  const handleKeepBrowsing = () => {
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Will replace with backend call later
    if (
      name === "admin" &&
      email === "admin@test.com" &&
      password === "admin123"
    ) {
      // Admin login
      login({
        id: 1,
        name: "admin",
        email: "admin@test.com",
        role: "admin", // IMPORTANT: Add role
      });
      navigate("/admin");
    } else if (
      name === "user" &&
      email === "user@test.com" &&
      password === "user123"
    ) {
      // User login
      login({
        id: 2,
        name: "user",
        email: "user@test.com",
        role: "user", // IMPORTANT: Add role
      });
      navigate("/users/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    // <div className='p-10 max-w-[400px] m-auto bg-gray-300 '>
    <div className="bg-gray-300 h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full m-auto space-y-8 bg-white rounded-lg p-8"
      >
        <div className="header flex justify-center items-center">
          <h1 className="text-2xl font-bold">Login</h1>
        </div>

        <div className="inputs">
          <div className="name flex mt-5 bg-gray-200 h-15 opacity-80">
            <img
              src={user_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80 "
            />
            <input
              type="text"
              value={name}
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="email flex mt-5 bg-gray-200 h-15 opacity-80">
            <img
              src={mail_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80 "
            />
            <input
              type="email"
              value={email}
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="password flex mt-5 bg-gray-200 h-15 opacity-80">
            <img
              src={pass_icon}
              alt=""
              className="w-6 h-6 m-5 mt-5 opacity-80 "
            />
            <input
              type="password"
              value={password}
              className="border-none outline-none w-full flex bg-gray-200 h-15 opacity-80"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="buttons space-y-3">
          <button className="forgot-password text-blue-400 cursor-pointer">
            Forgot Password?
          </button>
          <button
            type="submit"
            className="bg-blue-600 h-14 font-semibold text-white text-center rounded-lg cursor-pointer hover:bg-blue-600 w-full"
          >
            Login
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

      {/* Test Credentials
      <div className='mt-6 p-4 bg-gray-100 rounded'>
        <p className='font-bold mb-2'>Test Accounts:</p>
        <p className='text-sm'>Admin: admin / admin@test.com / admin123</p>
        <p className='text-sm'>User: user / user@test.com / user123</p>
      </div> */}
    </div>
  );
};

export default Login;

{
  /* <div>
  <form>
    <div className="header"></div>
    <div className="inputs"></div>
    <div className="buttons"></div>
  </form>
</div> */
}
