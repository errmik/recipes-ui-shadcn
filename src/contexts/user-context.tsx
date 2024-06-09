"use client";
import { createContext, useContext, useState } from "react";

//Still not clear how to use types here...
export const UserContext = createContext<any>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState();

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
