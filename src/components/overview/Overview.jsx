import styles from './Overview.module.css';
import Button from '../button/Button.jsx';

function Overview({ toggleOverview }) {

  return (
    <div className={styles.overviewWrapper} >
      <div className={styles.overviewContent}>
          <h3>Previous Cards</h3>
          <div className={styles.cardsWrapper}>
            {/* TODO: put cards into context or something */}
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