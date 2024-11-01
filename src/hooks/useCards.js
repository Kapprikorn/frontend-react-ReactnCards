import { useState } from 'react';
import axios from 'axios';

const useCards = () => {
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentDeck, setCurrentDeck] = useState('new');

  // Fetch a single card
  const getCard = async () => {
    setLoading(true);
    try {
      const result = await axios.get('https://www.deckofcardsapi.com/api/deck/new/draw/?count=1');
      setCard(result.data);
      return result.data;
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch multiple cards
  const getCards = async (count = 2) => {
    setLoading(true);
    try {
      const result = await axios.get(`https://www.deckofcardsapi.com/api/deck/${currentDeck}/draw/?count=${count}`);
      if (currentDeck === 'new') {
        setCurrentDeck(result.data.deck_id);
      } else if (result.data.remaining < 20) {
        setCurrentDeck('new');
      }
      return result.data.cards;
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { card, getCard, getCards, loading, error };
}

export default useCards;