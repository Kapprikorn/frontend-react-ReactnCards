import styles from './GamePreview.module.css';
import { useNavigate } from 'react-router-dom';

function GamePreview({ title, image, route }) {
  const navigate = useNavigate();

  return (
    <div className={styles.gamePreview} onClick={() => navigate(route)}>
      <h1 className={styles.gamePreviewHeader}>{title}</h1>
      <div className={styles.gamePreviewButton}>
        <img src={image} alt="HiLo preview" className={styles.gamePreviewImage} />
      </div>
    </div>
  );
}

export default GamePreview;