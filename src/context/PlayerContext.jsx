import { createContext, useState } from 'react';

const PlayerContext = createContext(undefined);

export const PlayerProvider = ({ children }) => {
  const [balance, setBalance] = useState(1000);

  const updateBalance = (amount) => {
    setBalance(balance + amount);
  };

  return (
    <PlayerContext.Provider value={{ balance, updateBalance }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;