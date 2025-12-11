import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = Object.values(form).every((val) => val.trim() !== "");
    if (!isValid) {
      alert("Please fill in all fields");
      return;
    }
    // Check if passwords match
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/users", form);
      alert("User signed up successfully!");
      navigate("/login");
    } catch (err) {
      alert("Error signing up user: " + err.message);
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-[500px] mx-auto my-20 rounded-lg shadow-lg py-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Sign Up to TicketFlow
        </h2>
        <form onSubmit={handleSubmit} className="px-6">
          <div className="flex flex-col space-y-2.5 mb-4">
            <label htmlFor="username" className="text-gray-500">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="p-3 border border-gray-500 w-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col space-y-2.5 mb-4">
            <label htmlFor="email" className="text-gray-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="p-3 border border-gray-500 w-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col space-y-2.5 mb-4">
            <label htmlFor="password" className="text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="p-3 border border-gray-500 w-full rounded-2xl"
            />
          </div>
          <div className="flex flex-col space-y-2.5 mb-4">
            <label htmlFor="confirmPassword" className="text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="p-3 border border-gray-500 w-full rounded-2xl"
            />
          </div>

          <div className="flex flex-col space-y-2.5 my-10">
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-500 text-center py-2">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
