import styles from './HandDisplay.module.css';
import PlayingCard from '../../components/playingCard/PlayingCard';

function HandDisplay({ hand, score, player, isPlayerTurnActive }) {
  return (
    <div className={styles.handWrapper}>
      <div className={styles.cardWrapper}>
        {
          hand.map( (card, index) => {
            return (isPlayerTurnActive && index === 0)
            ? <PlayingCard key={index} card={'https://www.deckofcardsapi.com/static/img/back.png'} />
            : <PlayingCard key={index} card={card.image} />
          })
        }
      </div>
      <div className={styles.scoreWrapper}>
        <p>{player}s score: {score}</p>
      </div>
    </div>
  );
}

export default HandDisplay;