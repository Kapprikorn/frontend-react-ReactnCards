import { createContext } from 'react';

const AuthContext = createContext({});

function AuthContextProvider({ children }) {

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;