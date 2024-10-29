import styles from './PlayingCard.module.css';

function PlayingCard({ card }) {
  return (
    <div className={styles.playingCard}>
      {
        card &&
        <img
          src={card.cards ? card.cards[0].image : card}
          alt={'playing card'}
        />
      }
    </div>
  );
}

export default PlayingCard;