import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

// Define the structure of your user
export interface UserType {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  imgUrl?: string;
}

// Define context type
interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

// Create context
const UserContext = createContext<UserContextType | null>(null);

// Provider
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook with non-null assertion
export const useUserProfile = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
