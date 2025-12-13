import { useContext, createContext, useState, useEffect } from "react";
import api from "../src/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    try {
      const fetchUser = async () => {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
      };
      fetchUser();
    } catch (err) {
      console.log("Error fetching user in context:", err);
    }
  }, []);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
