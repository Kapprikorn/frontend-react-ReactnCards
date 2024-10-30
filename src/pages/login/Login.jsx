import styles from './Login.module.css';
import { useState } from 'react';
import Button from '../../components/button/Button.jsx';
import useNoviBackend from '../../hooks/useNoviBackend.js';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register, loading, error } = useNoviBackend();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    setSuccess('');
    try {
      await register(username, password);
    } catch(err) {
      console.error('handleRegister error:', err);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setSuccess('');
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      console.error('handleLogin error:', err);
    }
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
          {
            error && <p className="errorMessage">{error}</p>
          }
          {
            success && <p className="successMessage">{success}</p>
          }
          <div className={styles.formSubmitWrapper}>
            <Button
              type="button"
              color="secondary"
              handleClick={handleRegister}
              disabled={loading}
              text="Register" />
            <Button
              type="button"
              handleClick={handleLogin}
              disabled={loading}
              text="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;