// Overview.jsx
import styles from './Overview.module.css';
import Button from '../button/Button.jsx';
import { useCardContext } from '../../hooks/useCardContext.js';
import PlayingCard from '../playingCard/PlayingCard.jsx';

function Overview({ toggleOverview }) {
  const { hiLoCards, blackjackCards } = useCardContext();

  return (
    <div className={styles.overviewWrapper}>
      <div className={styles.overviewContent}>
        <div className={styles.gameWrapper}>
          <h3>new ← Previous HiLo Cards → old</h3>
          <div className={styles.cardsWrapper}>
            {hiLoCards.length
             ? (
               hiLoCards.slice(-10)
                        .reverse()
                        .map((card, index) => (
                 <PlayingCard key={index} card={card} />
               ))
             )
             : (
               <p>No HiLo cards drawn yet.</p>
             )
            }
          </div>
        </div>
        <div className={styles.gameWrapper}>
          <h3>new ← Previous Blackjack Cards → old</h3>
          <div className={styles.cardsWrapper}>
            {blackjackCards.length
             ? (
               blackjackCards.slice(-10)
                             .reverse()
                             .map((card, index) => (
                               <PlayingCard key={index} card={card.image} />
                             ))
             )
             : (
               <p>No Blackjack cards drawn yet.</p>
             )
            }
          </div>
        </div>
        <Button
          text="i"
          color="info"
          className={styles.overviewInfoButton}
          handleClick={toggleOverview}
        />
      </div>
    </div>
  );
}

export default Overview;