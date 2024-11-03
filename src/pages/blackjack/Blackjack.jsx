import styles from './Blackjack.module.css';
import { useEffect, useState } from 'react';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import Button from '../../components/button/Button.jsx';
import useCards from '../../hooks/useCards.js';
import { usePlayer } from '../../hooks/usePlayer.js';
import { useCardContext } from '../../hooks/useCardContext.js';
import HandDisplay from '../../components/handDisplay/HandDisplay.jsx';
import calculateHandScore from '../../helpers/calculateHandScore.js';

function Blackjack({ toggleOverview }) {
  const { getCards } = useCards();
  const { balance, updateBalance } = usePlayer();
  const { addBlackjackCard } = useCardContext();
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [betAmount, setBetAmount] = useState(10);
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
      cards.forEach(card => addBlackjackCard(card));
    } catch (err) {
      console.error("Error fetching cards.", err);
    }
  };

  const drawNewCard = async () => {
    try {
      const cards = await getCards(1);
      addBlackjackCard(cards[0]);
      return cards[0];
    } catch (err) {
      console.error("Error drawing new cards.", err);
      return null;
    }
  };

  const calculateScores = () => {
    const playerScore = calculateHandScore(playerHand);
    const dealerScore = calculateHandScore(dealerHand, true, isPlayerTurnActive);

    setPlayerScore(playerScore);
    setDealerScore(dealerScore);

    if (playerScore > 21) {
      setIsGameActive(false);
      setMessage("Bust! You lose.");
      updateBalance(-betAmount);
    } else if (playerScore === 21) {
      setIsGameActive(false);
      if (playerHand.length === 2) {
        setMessage("Blackjack! You win.");
        updateBalance(betAmount * 1.5);
      } else {
        setMessage("21! You win.");
        updateBalance(betAmount);
      }
    } else if (dealerScore > 21) {
      setIsGameActive(false);
      setMessage("Dealer busts! You win.");
      updateBalance(betAmount);
    } else if (dealerScore === 21) {
      setIsGameActive(false);
      setMessage("Dealer has 21! You lose.");
      updateBalance(-betAmount);
    }
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
      updateBalance(betAmount);
    }
    else if (finalDealerScore > finalPlayerScore) {
      setMessage('Dealer wins.');
      updateBalance(-betAmount);
    }
    else if (finalDealerScore < finalPlayerScore) {
      setMessage('You win!');
      updateBalance(betAmount);
    }
    else {
      setMessage('It\'s a tie!');
    }

    setIsGameActive(false);
  };

  return (
    <section className={styles.pageWrapper}>
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
      <article className={styles.gameAreaWrapper}>
        <HandDisplay
          hand={dealerHand}
          score={dealerScore}
          player="dealer"
          isPlayerTurnActive={isPlayerTurnActive}
        />
        {message && <p className={styles.message}>{message}</p>}
        <HandDisplay
          hand={playerHand}
          score={playerScore}
          player="player"
        />
      </article>
      <Button
        text="i"
        color="info"
        className={styles.infoButton}
        handleClick={toggleOverview}
      />
    </section>
  );
}

export default Blackjack;