import React from 'react'; 
import { Link } from 'react-router-dom';
import logo from '../assets/fire-logo.jpg'
import '../styles/header.css';

function Header() { 
    return ( 
        <div className='header'>
            <div className='logo-container'>
                <Link to='/'><img src={logo} className='logo' alt='logo'/></Link> 
                <Link to='/'><h1 className='app-title'>FireAid</h1></Link>
            </div>
            <ul className='nav-links'>
                <li>
                    <Link to='/home'><h1 className='home-link'>Home</h1></Link>
                </li>
                <li>
                    <Link to='/resource'><h1 className='resource-link'>Resources</h1></Link>
                </li>
                <li>
                    <Link to='/updates'><h1 className='updates-link'>Live Updates</h1></Link>
                </li>
                <li>
                    <Link to='/legal'><h1 className='legal-link'>Legal</h1></Link>
                </li>
                <li>
                    <Link to='/community'><h1 className='community-link'>Community</h1></Link>
                </li>
            </ul>
            {/* <div className='language-container'>
                <select className='language' id='language'>
                    <option value='english'>ENG</option>
                    <option value='spanish'>SPA</option>
                </select>
            </div> */}
            <div className='signlog-container'>
                <button className='signup-button'>Sign Up</button>
                <button className='login-button'>Log In</button>
            </div>
        </div>
    )
}; 

export default Header;