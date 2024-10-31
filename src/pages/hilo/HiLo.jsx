import styles from './HiLo.module.css';
import Button from '../../components/button/Button.jsx';
import { useEffect, useState } from 'react';
import useCards from '../../hooks/useCards.js';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import PlayingCard from '../../components/playingCard/PlayingCard.jsx';
import getCardValue from '../../helpers/hiloScoreTable.js';

function HiLo({ toggleOverview }) {

  const { card, getCard, error, loading } = useCards();
  const [previousCard, setPreviousCard] = useState(null);
  const [betAmount, setBetAmount] = useState(10); // Default starting bet amount
  const [balance, setBalance] = useState(100);
  const [betType, setBetType] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    drawNewCard();
  }, []);

  useEffect(() => {
    if (previousCard) evaluateBet();
  }, [card]);

  const drawNewCard = async () => {
    setPreviousCard(card);
    await getCard();
  }

  const handleBet = async (betButtonType) => {
    setBetType(betButtonType);
    await drawNewCard();
  };

  const evaluateBet = () => {
    const previousCardValue = getCardValue(previousCard);
    const currentCardValue = getCardValue(card);

    if (
      (betType === 'higher' && currentCardValue > previousCardValue) ||
      (betType === 'lower' && currentCardValue < previousCardValue) ||
      (betType === 'equal' && currentCardValue === previousCardValue)
    ) {
      setBalance(balance + 10); // Winning bet
      setMessage(`You Won ${betAmount} credits! 🥳`);
    } else {
      setBalance(balance - 10); // Losing bet
      setMessage(`You Lost ${betAmount} credits`);
    }
  }

  const handleSetBetAmount = (amount) => {
    setBetAmount(amount);
  };


  return (
    <div className={styles.pageWrapper}>
      <GameBettingView betAmount={betAmount} setBetAmount={handleSetBetAmount}>
        <div className={styles.playButtonsWrapper}>
          <Button
            text="Lower ↘"
            className={styles.playButton}
            handleClick={ () => {handleBet('lower')} } />
          <Button
            text="Equals ="
            className={styles.playButton}
            handleClick={ () => {handleBet('equal')} }
            color="secondary" />
          <Button
            text="Higher ↗"
            className={styles.playButton}
            handleClick={ () => {handleBet('higher')} } />
        </div>
      </GameBettingView>
      <div className={styles.gameAreaWrapper}>
        <div className={styles.cardPreviewWrapper}>
          <div className={styles.playingCardPreview}>
            <p>K</p>
            <p className={styles.rotatedText}>|&lt;</p>
          </div>
          <p>King being the highest</p>
        </div>
        {
          loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <PlayingCard card={card} />
          )
        }
        <div className={styles.cardPreviewWrapper}>
          <div className={styles.playingCardPreview}>
            <p>A</p>
            <p className={styles.rotatedTextReverse}>|&lt;</p>
          </div>
          <p>Ace being the lowest</p>
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

export default HiLo;