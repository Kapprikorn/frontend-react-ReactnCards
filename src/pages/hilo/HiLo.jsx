import styles from './HiLo.module.css';
import Button from '../../components/button/Button.jsx';
import { useEffect, useState } from 'react';
import useCards from '../../hooks/useCards.js';

function HiLo() {
  const playerCredits = 10000;

  const [betAmount, setBetAmount] = useState(10);

  const doubleBet = () => {
    setBetAmount(betAmount * 2);
  };

  const halfBet = () => {
    setBetAmount(Math.ceil(betAmount / 2));
  };

  const { card, getCard, error, loading } = useCards();

  useEffect(() => {
    getCard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.playerCreditsWrapper}>
          <p>Total Credits</p>
          <div className={styles.playerCredits}>
            {playerCredits}
          </div>
        </div>
        <div className={styles.playButtonsWrapper}>
          <Button
            text="Lower ↘"
            className={styles.playButton}
            handleClick={() => {}} />
          <Button
            text="Equals ="
            className={styles.playButton}
            handleClick={() => {}}
            color="secondary" />
          <Button
            text="Higher ↗"
            className={styles.playButton}
            handleClick={() => {}} />
        </div>
        <div className={styles.bettingWrapper}>
          <Button
            text="Bet"
            className={styles.betButton}
            handleClick={() => {}} />
          <div className={styles.betInputWrapper}>
            <label>
              Credits
            </label>
            <input
              className={styles.betInputField}
              onChange={(event) => {setBetAmount(+event.target.value);}}
              type="number"
              inputMode="numeric"
              value={betAmount} />
            <div className={styles.betButtonWrapper}>
              <Button
                text="½"
                className={styles.changeBetButton}
                color="gray"
                handleClick={halfBet} />
              <Button
                text="2*"
                className={styles.changeBetButton}
                color="gray"
                handleClick={doubleBet} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.gameAreaWrapper}>
        <div className={styles.cardPreviewWrapper}>
          <div className={styles.playingCardPreview}>
            <p>K</p>
            <p className={styles.rotatedText}>|&lt;</p>
          </div>
          <p>King being the highest</p>
        </div>
        <div className={styles.playingCard}>
          {
            card &&
            <img
              src={card.cards[0].image}
              alt={`${card.cards[0].value.toLowerCase()} of ${card.cards[0].suit.toLowerCase()}`}
            />
          }
        </div>
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
      />
    </div>
  );
}

export default HiLo;