import './App.css';
import { Route, Routes, useLocation, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.jsx';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import HiLo from './pages/hilo/HiLo.jsx';
import Blackjack from './pages/blackjack/Blackjack.jsx';
import Overview from './components/overview/Overview.jsx';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth.js';

function App() {
  const currentPagePath = useLocation().pathname;
  const currentPage = currentPagePath.charAt(1).toUpperCase() + currentPagePath.slice(2);
  let [isOverviewActive, setIsOverviewActive] = useState(false);
  const { isTokenValid } = useAuth();
  const navigate = useNavigate();

  const toggleOverview = () => {
    isOverviewActive = setIsOverviewActive(!isOverviewActive);
  }

  useEffect(() => {
    if (!isTokenValid()) {
      navigate('/');
    }
  }, [isTokenValid, navigate]);

  return (
    <>
      {
        currentPagePath !== '/' &&
        (
          <header className="header-wrapper">
            <NavBar
              pageName={currentPage}
            />
          </header>
        )
      }

      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hilo" element={<HiLo toggleOverview={toggleOverview} />} />
          <Route path="/blackjack" element={<Blackjack toggleOverview={toggleOverview} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {isOverviewActive && <Overview toggleOverview={toggleOverview}/> }
      </main>
    </>
  );
}

export default App;
