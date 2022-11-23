import React, { SetStateAction, useState, useContext, Dispatch } from 'react';

type State = {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
};

const AuthContext = React.createContext<State>({} as State);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
