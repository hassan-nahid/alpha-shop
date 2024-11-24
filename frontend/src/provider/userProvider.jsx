import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // If user data exists in localStorage, set it
    }
  }, []);

  // Update user data and store it in localStorage
  const setUserData = (data) => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data)); // Store user data in localStorage
  };

  // Clear user data
  const clearUserData = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, setUserData, clearUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the context
export const useUser = () => useContext(UserContext);
