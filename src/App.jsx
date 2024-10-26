import './App.css'
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar/NavBar.jsx';
import Login from './pages/login/Login.jsx';

function App() {
  let currentPage = 'login';

  return (
    <>
      {
        currentPage !== 'login' &&
        (
          <header className="header-wrapper">
            <NavBar />
          </header>
        )
      }

      <main className="main-wrapper">
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </main>

      <footer className="footer-wrapper">

      </footer>
    </>
  )
}

export default App
