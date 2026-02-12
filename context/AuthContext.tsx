"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

/* =======================
   TYPES
======================= */
export type User = {
  id: number;
  email: string;
  role: string;
  full_name?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
};

/* =======================
   CONTEXT
======================= */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   PROVIDER
======================= */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = true; // Always authenticated in frontend mode

  /* =======================
     DEMO AUTO LOGIN
  ======================= */
  useEffect(() => {
    const demoUser: User = {
      id: 1,
      email: "demo@freelancerlab.com",
      role: "freelancer", // role doesn't matter now
      full_name: "Altaf Raja",
    };

    setUser(demoUser);
    setToken("demo-token");
    setLoading(false);
  }, []);

  const login = () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* =======================
   HOOK
======================= */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
