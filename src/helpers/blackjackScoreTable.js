const getCardValue = (card) => {
  const value = card.value;

  switch (value) {
    case 'ACE':
      return 1; // ACE can be 1 or 11, but we handle that logic in the component.
    case 'KING':
    case 'QUEEN':
    case 'JACK':
      return 10;
    default:
      return parseInt(value, 10);
  }
};

export default getCardValue;