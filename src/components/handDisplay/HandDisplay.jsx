import styles from './HandDisplay.module.css';
import PlayingCard from '../../components/playingCard/PlayingCard';

function HandDisplay({ hand, score }) {
  return (
    <div className={styles.handWrapper}>
      <div className={styles.cardWrapper}>
        {hand.map((card, index) => (
          <PlayingCard key={index} card={card.image} />
        ))}
      </div>
      <div className={styles.scoreWrapper}>
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

export default HandDisplay;