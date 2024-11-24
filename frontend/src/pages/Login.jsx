import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  toast } from "react-toastify";
import { useUser } from "../provider/userProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserData } = useUser(); 
  const {user} = useUser();



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || "Invalid login credentials.");
        return;
      }

      localStorage.setItem("token", data.token); // Save the token
      setUserData(data.user); // Save the user details
      toast.success("Login successful!");
      navigate("/")
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", err);
    }
  };

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user,navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-sm bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>
          <div className="mb-6">
            <button
              type="submit"
              className="btn btn-ghost bg-primary hover:bg-primary text-white border-1 border-white hover:border-1 hover:border-white w-full"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="link-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
      
    </div>
  );
};

export default Login;
