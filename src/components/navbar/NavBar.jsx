// import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../../public/vite.svg';

function NavBar() {
  const navigate = useNavigate();
  // const [activePage, setActivePage] = useState('');

  return (
    <nav className="">
      <div className="navigation-logo-wrapper">
        <img className="navigation-logo"
             src={logo}
             alt="App logo"
             onClick={() => navigate('/')} />
      </div>
    </nav>
  );
}

export default NavBar;