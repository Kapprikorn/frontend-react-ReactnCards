import styles from './GameBettingView.module.css';
import Button from '../button/Button.jsx';

function GameBettingView({ children, betAmount, setBetAmount, isGameActive, startGame }) {
  const playerCredits = 10000;

  const doubleBet = () => {
    setBetAmount(betAmount * 2);
  };

  const halfBet = () => {
    setBetAmount(Math.ceil(betAmount / 2));
  };


  return (
    <div className={styles.menuWrapper}>
      <div className={styles.playerCreditsWrapper}>
        <p>Total Credits</p>
        <div className={styles.playerCredits}>
          {playerCredits}
        </div>
      </div>
      {children}
      <div className={styles.bettingWrapper}>
        <Button
          text="Bet"
          disabled={isGameActive}
          className={styles.betButton}
          handleClick={startGame} />
        <div className={styles.betInputWrapper}>
          <label>
            Credits
          </label>
          <input
            className={styles.betInputField}
            disabled={isGameActive}
            onChange={(event) => {setBetAmount(+event.target.value);}}
            type="number"
            inputMode="numeric"
            value={betAmount} />
          <div className={styles.betButtonWrapper}>
            <Button
              text="½"
              disabled={isGameActive}
              className={styles.changeBetButton}
              color="gray"
              handleClick={halfBet} />
            <Button
              text="2*"
              disabled={isGameActive}
              className={styles.changeBetButton}
              color="gray"
              handleClick={doubleBet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameBettingView;