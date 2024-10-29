import { useState } from 'react';
import styles from './GameBettingView.module.css';
import Button from '../button/Button.jsx';

function GameBettingView({ children }) {
  const playerCredits = 10000;

  const [betAmount, setBetAmount] = useState(10);

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
  );
}

export default GameBettingView;