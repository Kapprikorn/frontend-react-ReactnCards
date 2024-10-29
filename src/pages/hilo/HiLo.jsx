import styles from './HiLo.module.css';
import Button from '../../components/button/Button.jsx';
import { useEffect } from 'react';
import useCards from '../../hooks/useCards.js';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';

function HiLo() {

  const { card, getCard, error, loading } = useCards();

  useEffect(() => {
    getCard();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.pageWrapper}>
      <GameBettingView>
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
      </GameBettingView>
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