import { useEffect } from 'react';
import useCards from '../hooks/useCards.js';

const Test = () => {
  const { card, getCard, error, loading } = useCards();

  useEffect(() => {
    getCard();
  }, []);

  // Console log to check what 'card' contains
  console.log(card);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <p>{card && card.cards[0].value}</p>
    </>
  );
};

export default Test;