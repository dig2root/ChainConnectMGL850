import { Link } from 'react-router-dom';
import './Header.scss';
import Navbar from './Navbar/Navbar.js';
import logo from './../images/logo.svg'

function Header() {

    return(
        <div className="header">
            <Link to="/"><img className="header-logo" src={logo} alt="logo"/></Link>
            <Navbar />
        </div>
    );
};

export default Header;