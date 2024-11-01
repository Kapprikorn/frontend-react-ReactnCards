// CardContext.jsx
import { createContext, useState } from 'react';

// Create a context for storing cards data
const CardContext = createContext(undefined);

// Create a provider component
export const CardProvider = ({ children }) => {
  const [hiLoCards, setHiLoCards] = useState([]);
  const [blackjackCards, setBlackjackCards] = useState([]);

  const addHiLoCard = (newCard) => {
    setHiLoCards((prevCards) => [...prevCards, newCard]);
    console.log(hiLoCards);
  };

  const addBlackjackCard = (newCard) => {
    console.log(newCard);
    setBlackjackCards((prevCards) => [...prevCards, newCard]);
  };

  return (
    <CardContext.Provider value={{ hiLoCards, blackjackCards, addHiLoCard, addBlackjackCard }}>
      {children}
    </CardContext.Provider>
  );
};

export default CardContext;