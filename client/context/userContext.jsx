import { useContext, createContext, useState, useEffect } from "react";
import api from "../src/api";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
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
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
