import styles from './Blackjack.module.css';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import Button from '../../components/button/Button.jsx';
import useCards from '../../hooks/useCards.js';
import { useEffect, useState } from 'react';
import PlayingCard from '../../components/playingCard/PlayingCard.jsx';
import getCardValue from '../../helpers/blackjackScoreTable.js';

function Blackjack({ toggleOverview }) {
  const { getCards } = useCards();
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
  const [balance, setBalance] = useState(100);
  const [message, setMessage] = useState("");
  const [isGameActive, setIsGameActive] = useState(false);
  const [isPlayerTurnActive, setIsPlayerTurnActive] = useState(false);

  useEffect(() => {
    if (playerHand.length > 0) {
      calculateScores();
    }
  }, [playerHand]);

  useEffect(() => {
    if (dealerHand.length > 0) {
      calculateScores();
    }
  }, [dealerHand]);

  const startGame = async () => {
    if (balance <= 0) {
      setMessage("You don't have enough credits to start the game.");
      return;
    }
    setPlayerHand([]);
    setDealerHand([]);
    setIsGameActive(true);
    setMessage("Game started!");
    await fetchInitialHands();
    setIsPlayerTurnActive(true);
  };

  const fetchInitialHands = async () => {
    try {
      const cards = await getCards(4); // Fetch 4 cards (2 for player, 2 for dealer)

      const playerCards = [cards[0], cards[1]];
      const dealerCards = [cards[2], cards[3]];

      setPlayerHand(playerCards);
      setDealerHand(dealerCards);
    } catch (err) {
      console.error("Error fetching cards.", err);
    }
  };

  const drawNewCard = async () => {
    try {
      const cards = await getCards(1);
      return cards[0]; // Adjusted to fetch the first card object
    } catch (err) {
      console.error("Error drawing new cards.", err);
      return null;
    }
  };

  const calculateScores = () => {
    const playerScore = calculateHandScore(playerHand);
    const dealerScore = calculateHandScore(dealerHand);

    setPlayerScore(playerScore);
    setDealerScore(dealerScore);

    if (playerScore > 21) {
      setIsGameActive(false);
      setMessage("Bust! You lose.");
      setBalance(balance - betAmount);
    } else if (playerScore === 21) {
      setIsGameActive(false);
      if (playerHand.length === 2) {
        setMessage("Blackjack! You win.");
        setBalance(balance + betAmount * 1.5);
      } else {
        setMessage("21! You win.");
        setBalance(balance + betAmount);
      }
    } else if (dealerScore > 21) {
      setIsGameActive(false);
      setMessage("Dealer busts! You win.");
      setBalance(balance + betAmount);
    } else if (dealerScore === 21) {
      setIsGameActive(false);
      setMessage("Dealer has 21! You lose.");
      setBalance(balance - betAmount);
    }
  };

  const calculateHandScore = (hand) => {
    let score = 0;
    let aceCount = 0;

    hand.forEach(card => {
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

  const hit = async () => {
    if (!isGameActive) return;
    const newCard = await drawNewCard();
    if (newCard) {
      setPlayerHand([...playerHand, newCard]);
    }
  };

  const stand = async () => {
    if (!isGameActive) return;
    setIsPlayerTurnActive(false);
    await dealerTurn();

    setIsGameActive(false);
  };

  const double = async () => {
    if (!isGameActive) return;
    const newCard = await drawNewCard();
    if (newCard) {
      setPlayerHand([...playerHand, newCard]);
      setBetAmount(betAmount * 2);
      stand();
    }
  };

  const handleSetBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const dealerTurn = async () => {
    if (!isGameActive) return;
    let dealerCurrentScore = dealerScore;

    while (dealerCurrentScore < 17) {
      const newCard = await drawNewCard();
      if (newCard) {
        setDealerHand((prevDealerHand) => {
          const updatedHand = [...prevDealerHand, newCard];
          dealerCurrentScore = calculateHandScore(updatedHand);
          return updatedHand;
        });
      }
      await new Promise((res) => setTimeout(res,400));
    }


    // Final score comparison
    const finalPlayerScore = calculateHandScore(playerHand);
    const finalDealerScore = dealerCurrentScore;

    if (finalDealerScore > 21) {
      setMessage('Dealer busts! You win.');
      setBalance(balance + betAmount);
    }
    else if (finalDealerScore > finalPlayerScore) {
      setMessage('Dealer wins.');
      setBalance(balance - betAmount);
    }
    else if (finalDealerScore < finalPlayerScore) {
      setMessage('You win!');
      setBalance(balance + betAmount);
    }
    else {
      setMessage('It\'s a tie!');
    }

    setIsGameActive(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <GameBettingView
        betAmount={betAmount}
        setBetAmount={handleSetBetAmount}
        startGame={startGame}
        isGameActive={isGameActive}
      >
        <div className={styles.playButtonsWrapper}>
          <Button
            text="Hit"
            disabled={!isGameActive || !isPlayerTurnActive}
            className={styles.playButton}
            handleClick={hit} />
          <Button
            text="Stand"
            disabled={!isGameActive || !isPlayerTurnActive}
            className={styles.playButton}
            handleClick={stand}
            color="secondary" />
          <Button
            text="Double"
            disabled={!isGameActive || !isPlayerTurnActive}
            className={styles.playButton}
            color="darkGray"
            handleClick={double} />
        </div>
      </GameBettingView>
      <div className={styles.gameAreaWrapper}>
        <div className={styles.boardWrapper}>
          <div className={styles.scoreWrapper}>
            <p>{dealerScore}</p>
          </div>
          <div className={styles.cardWrapper}>
            {dealerHand.map((card, index) => (
              <PlayingCard key={index} card={card.image} />
            ))}
          </div>
        </div>
        {message && <p className={styles.message}>{message}</p>}
        <div className={styles.boardWrapper}>
          <div className={styles.scoreWrapper}>
            <p>{playerScore}</p>
          </div>
          <div className={styles.cardWrapper}>
            {playerHand.map((card, index) => (
              <PlayingCard key={index} card={card.image} />
            ))}
          </div>
        </div>
      </div>
      <Button
        text="i"
        color="info"
        className={styles.infoButton}
        handleClick={toggleOverview}
      />
    </div>
  );
}

export default Blackjack;