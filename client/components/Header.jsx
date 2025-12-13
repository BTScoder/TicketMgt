import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const { user, logoutUser } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logoutUser();

    navigate("/login");
  };
  return (
    <>
      <div className="flex max-w-7xl mx-auto justify-between items-center py-5">
        <h1 className="text-3xl font-bold text-blue-600">Ticket Flow</h1>
        <div className="space-x-4 ">
          {user ? (
            <Link to="/dashboard">
              <button className="text-gray-600">Dashboard</button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="font-semibold">Login</button>
            </Link>
          )}

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-xl "
            >
              Logout
            </button>
          ) : (
            <Link to="/signup">
              <button className="px-3 py-3 bg-blue-600 text-white rounded-2xl font-semibold">
                Get Started
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
