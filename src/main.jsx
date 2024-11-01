import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import './styles/css-reset.css'
import { AuthProvider } from './context/AuthContext.jsx';
import { CardProvider } from './context/CardContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CardProvider>
        <Router>
          <App />
        </Router>
      </CardProvider>
    </AuthProvider>
  </StrictMode>,
)
