import styles from './Blackjack.module.css';
import GameBettingView from '../../components/gameBettingView/GameBettingView.jsx';
import Button from '../../components/button/Button.jsx';
import useCards from '../../hooks/useCards.js';
import { useEffect } from 'react';
import PlayingCard from '../../components/playingCard/PlayingCard.jsx';

function Blackjack() {
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
            text="Hit"
            className={styles.playButton}
            handleClick={() => {}} />
          <Button
            text="Stand"
            className={styles.playButton}
            handleClick={() => {}}
            color="secondary" />
          <Button
            text="Double"
            className={`${styles.playButton}`}
            color="darkGray"
            handleClick={() => {}} />
        </div>
      </GameBettingView>
      <div className={styles.gameAreaWrapper}>
        <div className={styles.boardWrapper}>
          <div className={styles.scoreWrapper}>
            <p>10</p>
          </div>
          <div className={styles.cardWrapper}>
            <PlayingCard card={"https://www.deckofcardsapi.com/static/img/back.png"} />
            <PlayingCard card={card} />
          </div>
        </div>
        {/* TODO: Create Card hand and put that in React Context */}
        <div className={styles.boardWrapper}>
          <div className={styles.scoreWrapper}>
            <p>10</p>
          </div>
          <div className={styles.cardWrapper}>
            <PlayingCard card={card} />
            <PlayingCard card={card} />
            <PlayingCard card={card} />
            <PlayingCard card={card} />
            <PlayingCard card={card} />
            <PlayingCard card={card} />
          </div>
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

export default Blackjack;