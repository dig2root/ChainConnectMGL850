import { Link } from 'react-router-dom';
import './Footer.scss';
import logo from './../images/logo_blanc.svg'

function Footer() {

    return(
        <div className="footer">
            <div className="footer-about">
                <Link to="/"><img className="footer-logo" src={logo} alt="logo"/></Link>
                <p className='footer-about-content'>Automatic truck loading assistant optimized. The tool is accessible in Saas by subscribing to a monthly subscription with a choice of several formulas, each with their own advantage!</p>
            </div>
            <div className='footer-help'>
                <h1 className='footer-help-title'>Need help ?</h1>
                <ul>
                    <li>FAQ</li>
                    <li>contact@filltruck.fr</li>
                </ul>
            </div>
            <div className='footer-legals'>
                <a>Legal Notice</a>
            </div>
        </div>
    );
};

export default Footer;