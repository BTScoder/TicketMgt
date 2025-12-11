import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
const ProtectedRoute = ({ children }) => {
  const { user } = useUserContext();

  if (!user)
    return (
      <p>
        No User detected: <Link to="/login">Login</Link> or{" "}
        <Link to="/signup">Register</Link>
      </p>
    );
  return <>{children}</>;
};

export default ProtectedRoute;
