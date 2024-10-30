import styles from './HiLo.module.css';
import Button from '../../components/button/Button.jsx';
import { useEffect } from 'react';
import useCards from '../../hooks/useCards.js';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import PlayingCard from '../../components/playingCard/PlayingCard.jsx';

function HiLo({ toggleOverview }) {

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
        <PlayingCard card={card} />
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