import styles from './Login.module.css';
import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
    console.log('registerd', username, password);
  };
  const handleLogin = (event) => {
    event.preventDefault();
    console.log('logged in', username, password);
  };

  return (
    <div className="main-content">
      <div className={styles.loginWrapper}>
        <h1 className={styles.loginHeader}>React n&#39; Cards</h1>
        <form>
          <div className={styles.inputFieldWrapper}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
            />
          </div>
          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className="register-button"
              onClick={handleRegister}
            >
              Register
            </button>
            <button
              type="submit"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;