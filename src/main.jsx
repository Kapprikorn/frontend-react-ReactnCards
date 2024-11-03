import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import './styles/css-reset.css'
import { AuthProvider } from './context/AuthContext.jsx';
import { CardProvider } from './context/CardContext.jsx';
import { PlayerProvider } from './context/PlayerContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PlayerProvider>
        <CardProvider>
          <Router>
            <App />
          </Router>
        </CardProvider>
      </PlayerProvider>
    </AuthProvider>
  </StrictMode>,
)
