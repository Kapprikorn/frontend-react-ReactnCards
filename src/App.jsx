import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.jsx';
import Login from './pages/login/Login.jsx';
import Home from './pages/home/Home.jsx';
import HiLo from './pages/hilo/HiLo.jsx';
import Blackjack from './pages/blackjack/Blackjack.jsx';

function App() {
  let currentPage = 'HiLo';

  return (
    <>
      {
        currentPage !== 'login' &&
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
          <Route path="/hilo" element={<HiLo />} />
          <Route path="/blackjack" element={<Blackjack />} />
        </Routes>
      </main>

      {/*<footer className="footer-wrapper">*/}

      {/*</footer>*/}
    </>
  );
}

export default App;
