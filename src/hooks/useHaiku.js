import { useContext } from "react"
import { HaikuContext } from "../context/HaikuProvider"

export const useHaiku = () => {
  const context = useContext(HaikuContext);

  if (context === undefined) {
    throw new Error('useHaiku must be used within HaikuProvider');
  }

  return context;
}