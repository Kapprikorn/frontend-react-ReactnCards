import getCardValue from './blackjackScoreTable.js';

const calculateHandScore = (hand, isDealerHand = false, isPlayerTurnActive = false) => {
  let score = 0;
  let aceCount = 0;

  hand.forEach((card, index) => {
    // Skip the dealers' first card.
    if (isDealerHand && index === 0 && isPlayerTurnActive) return;

    let value = getCardValue(card);
    if (value === 1) {
      aceCount += 1;
      value = 11;
    }
    score += value;
  });

  while (aceCount > 0 && score > 21) {
    score -= 10;
    aceCount -= 1;
  }

  return score;
};

export default calculateHandScore;