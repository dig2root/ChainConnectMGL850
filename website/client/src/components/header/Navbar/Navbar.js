import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from './../../functions/Axios';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Navbar.scss';

function Navbar() {

    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const resp = await axios.get("/@me", {
                    headers: { 'Content-type': 'application/json'},
                    withCredentials: true
                });
                setUser(resp.data);
            } catch (error) {
                console.log("Not authenticated");
            }
        })();
    }, []);

    const logOut = async (e) => {
        e.preventDefault();
        await axios.post('/logout');
        window.location.href = "/";
    }

    return(
        <div className="navbar">
            {user != null ? (
                <ul className="navbar-list">
                    <li><NavLink to ="/" className="navbar-list--item" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to ="/offers" className="navbar-list--item" activeClassName="active">Offers</NavLink></li>
                    <li><NavLink to ="/tool" className="navbar-list--item" activeClassName="active">Application</NavLink></li>
                    <li><NavLink to ="/dashboard" className="navbar-list--icon"><AccountCircleIcon/></NavLink></li>
                    <li><NavLink to ="/" onClick={logOut} className="navbar-list--icon"><LogoutIcon/></NavLink></li>
                </ul>
            ) : (
                <ul className="navbar-list">
                    <li><NavLink to ="/" className="navbar-list--item" activeClassName="active">Home</NavLink></li>
                    <li><NavLink to ="/offers" className="navbar-list--item" activeClassName="active">Offers</NavLink></li>
                    <li><NavLink to ="/sign_in" className="navbar-list--button">Sign In</NavLink></li>
                </ul>
            )}
        </div>
    );
};

export default Navbar;