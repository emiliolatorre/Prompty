import { useContext } from 'react'
import { Link } from "react-router-dom";

const Nav = () => {

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/" className='link-no-underline'><img className='iconHome' src="/home.png" alt="home" /> Home</Link>
        </li>
        <li>
          <Link to="/chat" className='link-no-underline'><img className='iconChat' src="/prompty2.png" alt="user" />Chat</Link>
        </li>
        <li><img className='iconUserHeader' src="/userheader.png" alt="user" />My account</li>
        <li><img className='iconLogout' src="/logout.png" alt="logout" />Logout</li>
      </ul>
    </nav>
  );
};

export default Nav;