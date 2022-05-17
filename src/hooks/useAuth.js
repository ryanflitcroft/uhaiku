import { useContext } from "react";
import { authContext } from "../context/AuthProvider";

export const useAuth = () => {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error('useUser must be user within UserProvider');
  }

  return context;
};
