import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';

import logo from '../../assets/React_n_Cards_logo.png';
import Button from '../button/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';

function NavBar({ pageName }) {
  const navigate = useNavigate();
  const { removeToken } = useAuth();
  // TODO: implement navigation and pageName logic.

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // TODO: implement logout logic.
    removeToken();
    handleNavigation('/');
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <img
          className={styles.logo}
          src={`${logo}`}
          alt="App logo"
          onClick={() => {navigate('/home'); }}
        />
        <div className={styles.dropdownContainer}>
          <button className={styles.dropdownToggleButton}>
            Games ▼
          </button>
          <ul className={styles.dropdownMenu} role="menu">
            <li>
              <button
                className={styles.dropdownItem}
                onClick={() => handleNavigation('/hilo')}
                role="menuitem"
              >
                HiLo
              </button>
            </li>
            <li>
              <button
                className={styles.dropdownItem}
                onClick={() => handleNavigation('/blackjack')}
                role="menuitem"
              >
                Blackjack
              </button>
            </li>
          </ul>
        </div>
      </div>

      <h1 className={styles.pageName}>
        {pageName}
      </h1>

      <Button
        handleClick={handleLogout}
        text="Logout"
      />
    </nav>
  );
}

export default NavBar;