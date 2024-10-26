import { useState } from 'react';
import axios from 'axios';

const useCards = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch a card
  const getCard = async () => {
    setLoading(true);
    try {
      const result = await axios.get('https://www.deckofcardsapi.com/api/deck/new/draw/?count=1');
      setCard(result.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { card, getCard, loading, error };
}

export default useCards;