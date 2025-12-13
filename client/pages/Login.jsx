import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../src/api";
import toast from "react-hot-toast";
import { useUserContext } from "../context/userContext";
const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", form);
    try {
      const res = await api.post("/auth/login", form);
      const user = res.data.user;
      setUser(user); // this updates later
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message, {
        style: {
          background: "#22c55e",
          color: "#fff",
          fontWeight: "600",
        },
      });
      navigate(`/ticketmgt`);
    } catch (err) {
      toast.error("Unable to Login");
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-[400px] mx-auto my-20  rounded-lg shadow-lg py-4">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Login to TicketFlow
        </h2>
        <form onSubmit={handleSubmit} className=" px-6">
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

          <div className="flex flex-col space-y-2.5 my-10">
            <button
              type="submit"
              className=" px-6 py-3 rounded-2xl bg-blue-600 text-white font-semibold"
            >
              Login
            </button>
            <p className="text-sm text-gray-500 text-center py-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500">
                Signup
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
