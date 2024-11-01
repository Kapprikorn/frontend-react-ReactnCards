import styles from './HiLo.module.css';
import Button from '../../components/button/Button.jsx';
import { useEffect, useState } from 'react';
import useCards from '../../hooks/useCards.js';
import { useCardContext } from '../../hooks/useCardContext.js';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import getCardValue from '../../helpers/hiloScoreTable.js';
import CardDisplay from '../../components/cardDisplay/CardDisplay.jsx';

function HiLo({ toggleOverview }) {
  const { addHiLoCard } = useCardContext();
  const { card, getCard, error, loading } = useCards();
  const [previousCard, setPreviousCard] = useState(null);
  const [betAmount, setBetAmount] = useState(10); // Default starting bet amount
  const [balance, setBalance] = useState(100);
  const [betType, setBetType] = useState(null);
  const [isGameActive, setIsGameActive] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    drawNewCard();
  }, []);

  useEffect(() => {
    if (previousCard) evaluateBet();
  }, [card]);

  const drawNewCard = async () => {
    setPreviousCard(card);
    const newCard = await getCard();
    addHiLoCard(newCard);
  };

  const handleBet = async (betButtonType) => {
    setBetType(betButtonType);
    setMessage('');
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
      setBalance(balance + betAmount); // Winning bet
      setMessage(`You Won ${betAmount} credits! 🥳`);
    }
    else {
      setBalance(balance - betAmount); // Losing bet
      setIsGameActive(false);
      setMessage(`You Lost ${betAmount} credits`);
    }
  };

  const handleSetBetAmount = (amount) => {
    setBetAmount(amount);
  };

  return (
    <section className={styles.pageWrapper}>
      <GameBettingView
        betAmount={betAmount}
        setBetAmount={handleSetBetAmount}
        isGameActive={isGameActive}
        startGame={() => setIsGameActive(true)}>
        <div className={styles.playButtonsWrapper}>
          <Button
            text="Lower ↘"
            disabled={!isGameActive}
            className={styles.playButton}
            handleClick={() => {handleBet('lower');}} />
          <Button
            text="Equals ="
            disabled={!isGameActive}
            className={styles.playButton}
            handleClick={() => {handleBet('equal');}}
            color="secondary" />
          <Button
            text="Higher ↗"
            disabled={!isGameActive}
            className={styles.playButton}
            handleClick={() => {handleBet('higher');}} />
        </div>
      </GameBettingView>
      <article className={styles.gameAreaWrapper}>
        <div className={styles.gameWrapper}>
          <div className={styles.cardPreviewWrapper}>
            <div className={styles.playingCardPreview}>
              <p>K</p>
              <p className={styles.rotatedText}>|&lt;</p>
            </div>
            <p>King being the highest</p>
          </div>
          <div className={styles.playingCardWrapper}>
            <CardDisplay card={card} loading={loading} error={error} />
          </div>
          <div className={styles.cardPreviewWrapper}>
            <div className={styles.playingCardPreview}>
              <p>A</p>
              <p className={styles.rotatedTextReverse}>|&lt;</p>
            </div>
            <p>Ace being the lowest</p>
          </div>
        </div>
        {
          message && <p>{message}</p>
        }
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

export default HiLo;