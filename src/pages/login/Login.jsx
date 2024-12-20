import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import Button from '../../components/button/Button.jsx';
import useNoviBackend from '../../hooks/useNoviBackend.js';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const { login: loginCall, register: registerCall, loading, error } = useNoviBackend();
  const { isTokenValid } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isTokenValid()) {
      navigate('/home');
    }
  })

  const handleRegister = async (event) => {
    event.preventDefault();
    setSuccess('');
    try {
      await registerCall(username, password);
    } catch(err) {
      console.error('handleRegister error:', err);
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    setSuccess('');
    try {
      await loginCall(username, password);
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