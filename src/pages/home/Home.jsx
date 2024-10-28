import styles from './Home.module.css';
import hilo_preview from '../../assets/HiLo_preview.png';
import blackjack_preview from '../../assets/blackjack_preview.png';
import GamePreview from '../../components/gamePreview/GamePreview.jsx';

function Home() {
  return (
    <div className={styles.homeScreenWrapper}>
      <GamePreview title="HiLo" image={hilo_preview} route="/hilo" />
      <GamePreview title="Blackjack" image={blackjack_preview} route="/blackjack" />
    </div>
  );
}

export default Home;